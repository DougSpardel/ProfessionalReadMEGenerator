import inquirer from 'inquirer';
import MarkdownIt from 'markdown-it';
import fs from 'fs';
const md = new MarkdownIt();

async function main() {
    const answers = await inquirer.prompt([
        { name: 'title', message: 'Project title:', type: 'input' },
        { name: 'description', message: 'Project description:', type: 'input' },
        { name: 'installation', message: 'Installation instructions:', type: 'input' },
        { name: 'usage', message: 'Usage information:', type: 'input' },
        { name: 'contribution', message: 'Contribution guidelines:', type: 'input' },
        { name: 'tests', message: 'Test instructions:', type: 'input' },
        { 
          name: 'license', 
          message: 'Choose a license for your application:', 
          type: 'list',
          choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
        },
        { name: 'github', message: 'GitHub username:', type: 'input' },
        { name: 'email', message: 'Email address:', type: 'input' },
    ]);

    const licenseBadge = {
        'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        'GPL 3.0': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        'BSD 3': '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
        'None': ''
    };

    const markdownContent = `
${licenseBadge[answers.license]}
# ${answers.title}

## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is licensed under the ${answers.license} license.

## Contributing

${answers.contribution}

## Tests

${answers.tests}

## Questions

For any questions, please reach out to me at [${answers.email}](mailto:${answers.email}).

GitHub: [${answers.github}](https://github.com/${answers.github})
`;

    fs.writeFileSync('README.md', markdownContent);
}

main().catch(err => console.error(err));
