# Elenril

> _A combination of "Elen" (star) and "ril" (flow or river), symbolizing the flow of links across one central point, like stars aligned together._

## Introduction

This project is a simple and efficient web application that allows users to compile multiple links into a single shareable link. By using this app, you can reduce the hassle of sharing numerous URLs individually. Instead, you only need to share one link that provides access to all the links in your list.

## Features

1. **Customizable Link Name**:
    - Optionally provide a name for your list link (e.g., `https://christopher-pedraza.github.io/links/{custom_name}`).
    - If no name is provided, a random combination of five characters (letters and digits) will be used.
2. **URL Management**:
    - Add links one by one to your list using a dedicated text box.
    - URLs without a protocol (`http://` or `https://`) will automatically have `https://` prefixed.
    - View and verify added links in a clickable list.
    - Remove unwanted links from the list with a single click.
3. **Shareable List**:
    - Create a shareable page containing the list of links.
    - Links on the shared page are static and cannot be edited after creation.

## How to Use the App

### Step-by-Step Flow:

1. **Navigate to the App**:
    - Open the application in your browser.
2. **Optional: Provide a Custom Link Name**:
    - Enter a desired name for your list in the first text box at the top of the page.
    - If left blank, a random name will be generated.
3. **Add Links**:
    - Use the second text box to input links one by one.
    - Click the **"Add Link"** button to add the URL to your list.
    - The text box will clear after each addition.
4. **Verify and Edit**:
    - Check the added links in the list below the text boxes.
    - Click a link to open it in a new tab for verification.
    - Remove links by clicking the red cross icon next to them.
5. **Share the List**:
    - Click the **"Share List"** button to generate a shareable link.
    - The generated link will direct others to a page displaying the list of links.

### Note:

-   Once a list is shared, it cannot be edited. You must create a new list if changes are needed.

## Future Work

-   Add a "Copy to Clipboard" button for each link on the shared page to make it easy to copy individual URLs.
-   Automatically copy the shareable page link to the clipboard after creation.
-   Include a "Download All Links" button on the shared page to export all links as a `.txt` file.

## Known Issues

-   When entering a non-existent link, the page simply remains blank instead of redirecting you to the homepage.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/christopher-pedraza/links/issues) or open a [pull request](https://github.com/christopher-pedraza/links/pulls).

## License

This project is open-source and available under the [MIT License](LICENSE).
