const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

var team = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const startingQuestion = [
  {
    type: "confirm",
    name: "addingTeamMember",
    message: "Would you like to add a new team member?",
    default: true,
  },
];
const memberQuestion = [
  {
    type: "list",
    name: "employeeType",
    message: "What team member position would you like to add?",
    choices: ["Manager", "Engineer", "Intern"],
  },
];
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "ID",
    message: "What is the manager's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager's email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number?",
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?",
  },
  {
    type: "input",
    name: "ID",
    message: "What is the engineer's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's github?",
  },
];
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?",
  },
  {
    type: "input",
    name: "ID",
    message: "What is the intern's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the intern's school?",
  },
];

function startQuestions() {
  inquirer.prompt(startingQuestion).then(function (data) {
    console.log(data);
    if (data.addingTeamMember === true) {
      memberType();
    } else {
      endProgram();
    }
  });
}

function memberType() {
  inquirer.prompt(memberQuestion).then(function (data) {
    if (data.employeeType === "Manager") {
      managerEntry();
    } else if (data.employeeType === "Intern") {
      internEntry();
    } else if (data.employeeType === "Engineer") {
      engineerEntry();
    }
  });
}
function managerEntry() {
  inquirer.prompt(managerQuestions).then(function (data) {
    var newManager = new Manager(
      data.name,
      data.ID,
      data.email,
      data.officeNumber
    );
    team.push(newManager);
    console.log(newManager);
    startQuestions();
  });
}
function internEntry() {
  inquirer.prompt(internQuestions).then(function (data) {
    var newIntern = new Intern(data.name, data.ID, data.email, data.school);
    team.push(newIntern);
    console.log(newIntern);
    startQuestions();
  });
}
function engineerEntry() {
  inquirer.prompt(engineerQuestions).then(function (data) {
    var newEngineer = new Engineer(data.name, data.ID, data.email, data.github);
    team.push(newEngineer);
    console.log(newEngineer);
    startQuestions();
  });
}

function endProgram() {
  fs.writeFile("team.html", render(team), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Your page has been printed!");
  });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
function init() {
  console.log("Please generate your team below:");
  startQuestions();
}

init();
