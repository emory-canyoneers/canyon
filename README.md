# Canyon

Canyon seeks to use limited questions to help facilitate meaningful interactions between users and increase engagement with each other, not just with the Canyon app itself. Available now at [joincanyon.org](http://joincanyon.org)!

## Table of Contents

1. [Documentation](#documentation)
2. [Features](#features)
3. [Setup](#setup)
4. [Best Practice](#best-practice)
5. [Testing](#testing)
6. [Miscellaneous](#miscellaneous)

## Documentation

Refer to the `doc` directory for documentation of our entire codebase.

## Features

Canyon is split into two main components:

- [Mobile App](https://github.com/emory-canyoneers/canyon/tree/main/frontend)
- [Service API](https://github.com/emory-canyoneers/canyon/tree/main/backend)
- For documentation on each aspect of the app, go to their respective directories and refer to their READMEs.
- Alternatively, documentation for both are combined in the README of the `doc` directory.

## Setup

See each component's README for specific instructions on setting up its code. This section will be covering general environment setup.

For the sake of debugging issues and normalizing the development process across the board, this project's guides will use [VS Code](https://code.visualstudio.com/) as the IDE of choice due to its flexibility and customizability. That said, feel free to use whatever IDE you are comfortable with, and just do the respective steps in whatever environment you choose.

Firstly, download and install VS Code. Once you have that installed, also install [git](https://git-scm.com/downloads) (for Windows, use the installer; for MacOS, install Xcode; for Linux, check if you already have it installed before using your package manager) and check if it was installed properly by typing in `git --version` to a new terminal window. Restart VS Code if it is running.

Copy this repository's clone URL (https://github.com/emory-canyoneers/canyon.git), and on the new VS Code window, click the "Clone Git Repository..." option and paste the link in the box that pops up, placing the project folder in your desired location (one option would be `~/Documents/Projects`). Open the folder, and you now have the code locally! When you end up trying to push code to the repository on GitHub, you may need to provide git credentials.

If you happen to need credentials, you will have to create a personal access token on GitHub; go to [Settings > Developer Settings > Tokens > New Personal Access Token](https://github.com/settings/tokens/new) (or just click on the link), change the note to something like "personal-laptop-access," set the expiration (no expiration is most convenient, just make sure you do not share this with anyone), click on the "repo" scope, and finally generate your token. Copy this and make sure you save it somewhere, and when you are next asked to set your git password, paste this key in place of your GitHub password.

There are a few extensions that will make your life easier, so I would recommend installing them (you can just copy and paste the ID in paranthesis into the extensions search bar in VS Code).

- Backend
  - Extension Pack for Java (`vscjava.vscode-java-pack`)
  - Spring Boot Extension Pack (`vmware.vscode-boot-dev-pack`)
- Web
  - Mithril Emmet (`FallenMax.mithril-emmet`)

And that should be it! If at any point you have questions or run into difficulty, reach out for help!

## Best Practice

Just remember a few things while working on Canyon:

1. Edit code in a new branch to avoid conflicts by checking out a new branch on the "Source Control" tab of VS Code, naming it `username/feature`. Make sure to publish it - it is now your branch and you have free reign over what you do in it (within reason :)).
2. Please don't force add any ignored files, as they may contain secrets such as keys and passwords. If you add a new file with secrets, add it to the relevant `.gitignore` file and make a note when you create a pull request.
3. Make sure to communicate with anyone else working on the same issue to make sure we don't do double work.

## Testing

See each component's README for specific instructions on running and debugging its code.

## Miscellaneous

Made with ❤️ by the Emory Canyoneers, ©️ Emory Canyoneers 2024 under the ⚖️ GNU GPL-3.0 license
