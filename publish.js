const { promisify } = require('util');
const fs = require("fs");
const path = require("path");
const prompt = require("prompt");
const exec = require("child_process").execSync;
const gitUrl = "git@github.com:austinkelleher/test-marko-starter.git";
const gitBranch = "gh-pages";
const buildDir = __dirname + "/dist";
const publishDir = buildDir + "/__publish";
const domain = "github.com";
const generateRedirects = require("./generateRedirects");
const globAsync = promisify(require("glob"));
const readFileAsync = promisify(fs.readFile);

function writeFileAsync (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      return err ? reject(err) : resolve()
    })
  })
}

function execLogged(cmd) {
  console.log(cmd);
  exec(cmd);
}

execLogged("markoc . --clean");
execLogged("rm -rf .cache");

prompt.start();

const promptSchema = {
  properties: {
    commitMessage: {
      message: "Please enter a commit message: ",
      default: "updated static site",
      required: true
    }
  }
};

prompt.get(promptSchema, (err, res) => {
  if (err) {
    console.error("Error obtaining prompt", err);
    return;
  }

  const message = res.commitMessage;

  require("./project")
    .build()
    .then(async () => {

      const baseUrl = "flatland2";

      const files = await globAsync('./dist/**/*.html');

      for (const filePath of files) {
        let html = await readFileAsync(filePath, 'utf8');
        html = html.replace(/src="\//g, `src="${baseUrl}/`);
        html = html.replace(/href="\//g, `href="${baseUrl}/`);
        await writeFileAsync(filePath, html);
      }

      // create publish directory
      execLogged(`mkdir ${publishDir}`);

      // clone the repo that is the publish target
      execLogged(
        `cd ${publishDir} && git init && git remote add origin ${gitUrl} && git fetch`
      );

      // switch to the target branch
      try {
        execLogged(`cd ${publishDir} && git checkout -t origin/${gitBranch}`);
      } catch (e) {
        execLogged(`cd ${publishDir} && git checkout -b ${gitBranch}`);
      }

      // steal the .git directory
      execLogged(`mv ${publishDir + "/.git"} ${buildDir}`);
      execLogged(`rm -rf ${publishDir}`);

      // // create CNAME file
      // fs.writeFileSync(path.join(buildDir, "CNAME"), domain, "utf-8");

      await generateRedirects();

      // commit and push up the changes
      try {
        execLogged(
          `cd ${buildDir} && git add . --all && git commit -m "${message}"`
        );
        execLogged(`cd ${buildDir} && git push origin ${gitBranch}`);
        console.log(
          "Static site successfully built and pushed to remote repository."
        );
      } catch (e) {
        if (e.cmd && e.cmd.indexOf("git commit")) {
          console.log("Static site successfully built. No changes to push.");
        }
      }
    })
    .catch(err => {
      console.error("Error building project", err);
    });
});
