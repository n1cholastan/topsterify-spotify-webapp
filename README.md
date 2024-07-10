# Topsterify: A Spotify Stats Visualizer

**Topsterify** is a music data app that uses the Spotify API to display a user's top tracks and artists from the last 4 weeks, 6 months, or year. The app offers a way to visualize and explore your Spotify listening habits, responsive to all screen sizes.

## Features

- **Responsive Design:** Adaptable layout for mobile and desktop views.
- **Top Tracks and Artists:** View a user's top tracks and artists from the past 4 weeks, 6 months, or year.
- **Spotify API Integration:** Utilizes the PKCE Authorization Flow for secure API access.
- **User Authentication:** Sign in with Spotify to access personal data.

## Technologies Used

- **React:** For the interface and components
- **TailwindCSS:** For styling
- **Spotify API:** For fetching user data and displaying top tracks and artists.

## Installation

To get started with Topsterify, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/n1cholastan/topsterify-spotify-webapp.git
    cd client
    ```

2. **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

3. **Create an app:**

    Follow these steps to create a Spotify app and obtain your `Client_ID`:

    - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
    - Click **Create an App** and follow the instructions.
    - For **Redirect URI**, enter: `http://localhost:3000`.

4. **Obtain the `Client_ID`**

    - In the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), click on the app you just created.
    - Navigate to the **Settings**
    - The `Client_ID` can be found on this page.

5. **Create a `.env` file:**

    Create a `.env` file in the root directory of the project and add your Spotify credentials:

    ```env
    REACT_APP_CLIENT_ID={Your Client ID generated above}
    REACT_APP_REDIRECT_URL=http://localhost:3000
    ```

6. **Start the development server:**

    ```bash
    npm run start
    ```

    The app will be available at the url specified in the Redirect URL.

## Deployment

For deployment, you can host it on a local server by entering 

```bash
npm run start
```

## Configuration

Make sure to set up the following environment variables in your `.env` file:

```env
REACT_APP_CLIENT_ID=your_spotify_client_id
REACT_APP_REDIRECT_URL=http://localhost:3000
```

## Future Features

- **Terms of Service and Privacy Notice:** To be implemented
- **About Modal:** To be implemented
- **Error Handling:** Edge cases may cause crashes as full error handling has not been implemented
- **Future Features:** Graphical visualizations and Top Genres

## Acknowledgements

- **TailwindCSS** for the CSS framework
- **Spotify API** and its [documentation](https://developer.spotify.com/documentation/web-api/) for the listening data and the tutorials.
- **Images** taken from the Spotify API are used under their [terms of service](https://www.spotify.com/us/legal/end-user-agreement/)

## Contributing

If you would like to contribute to Topsterify, please fork the repository and submit a pull request. All contributions are welcome!