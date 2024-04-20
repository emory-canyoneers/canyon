# Canyon Frontend Mobile App

## Setup

To set up the app, make sure you are in the `/frontend` repository and run `npm i` to install all dependencies and `npx expo start` to start the app.

## Color Palette

App Colors (see `src/styles/colors.js`)

- ![#121418](https://placehold.co/15x15/121418/121418.png) `#121418` - Background
- ![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff/white` - Primary Text/Element
- ![#d3d3d3](https://placehold.co/15x15/d3d3d3/d3d3d3.png) `#d3d3d3/lightgray` - Secondary Text
- ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000/black` - Primary Contrast Text

Brand colors?

- ![#feffbe](https://placehold.co/15x15/feffbe/feffbe.png) `#feffbe` - Background
- ![#ffb77a](https://placehold.co/15x15/ffb77a/ffb77a.png) `#ffb77a` - Accent 1
- ![#fc9e4f](https://placehold.co/15x15/fc9e4f/fc9e4f.png) `#fc9e4f` - Accent 2
- ![#ff8a00](https://placehold.co/15x15/ff8a00/ff8a00.png) `#ff8a00` - Orange
- ![#eb5e28](https://placehold.co/15x15/eb5e28/eb5e28.png) `#eb5e28` - Dark 1
- ![#9a3d2c](https://placehold.co/15x15/9a3d2c/9a3d2c.png) `#9a3d2c` - Dark 2

## Todo List

1. **DONE** Self Provider
2. **NOT NEEDED** Fake data for groups, issues, self
3. **DONE** Update Auth to also fetch self
4. **Done** Skeleton pages with styling
5. Refactor Answers and Submit
6. Create answer/edit component with modal for answers page (copy groups modal)
7. Link answer/edit component to groups page
8. Clean up error handling

## Notes to Self

1. Since groups are being stored now, when clicking on groups inside the landing page pass group info and use ID in calls for issues, etc
2. For sending questions, use buttons to fill in response box and have input box
3. For submitting answers, looking at group
