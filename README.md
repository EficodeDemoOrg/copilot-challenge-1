# 🤖 Copilot Challenge #1

## 🎯 Challenge objective
Learn how to use MCP servers to enable Copilot Agent mode to access and execute the tools of your development environment. Install two MCP servers in your development environment and use them in your prompts in Agent mode.

## 📝 MCP server recap
* MCP (Model Context Protocol) servers provide a standardized way to interact with various tools, services, and systems.
* An MCP server is run locally on the developer's workstation, e.g., as a Docker container (remote servers are also possible using HTTP).
* Developers can initialize and manage MCP servers directly from their IDE or command-line tools.
* MCP allows seamless integration of external tools and data sources with Copilot. They support multiple types of integrations, including databases, APIs, and cloud services.
* MCP servers enable real-time exploration, execution, and interaction with connected resources.
* A wide variety of MCP servers are already available. **Caution must be taken when running MCP servers** found on the web because of potentially insecure or malicious implementations.

## 🔗 Useful links
* [Introduction to MCP protocol](https://modelcontextprotocol.io/introduction)
* [Collection of MCP servers](https://mcp.so/)
* [A quick intro video to MCP](https://www.youtube.com/watch?v=bC3mIQWHZMQ)

## 🚀 Challenge steps

### 📋 Prerequisites

* Visual Studio Code installed
* This project cloned and opened in Visual Studio Code
* Copilot and Copilot Chat extensions installed and authenticated to GitHub
* Node.js installed (to use npx)
* Docker installed (or alternatively Podman)

### 🎭 Challenge 1: Playwright MCP server
In the first challenge we will ask Copilot to do some UI testing on a webpage. Initially Copilot only uses the Playwright MCP for using the browser. After Copilot has successfully run "manually" the test steps, we ask it to generate a Playwright test case based on the steps.

You can either use the simple node application in the playwright-mcp-challenge folder or a web app that you are currently working on.

1. Install dependencies
    ```bash
    cd playwright-mcp-challenge
    npm install
    ```

1. Install Playwright MCP server
    * Open the command palette: Shift+Control+P (Windows), Shift+Command+P (Mac)
    * Type "MCP" and select "Add server"
    * Create the file .vscode/mcp.json in your workspace with the following contents:
        ```json
        {
            "servers": {
                "playwright": {
                    "command": "npx",
                    "args": [
                        "@playwright/mcp@latest"
                    ]
                }
            }
        }
        ```
    * Click on the small play button in the JSON file that appears above the Playwright server configuration:
        
        ![Playwright start button](playwright_start_button.png)
    * Open Copilot chat window, select "Agent" from the mode selector menu. You should now see the tools menu in the chat window. Click on it to list all available tools. You should see Playwright and its various tools listed there. 

1. Use this prompt to make Copilot do some ad-hoc testing in the browser:
    ```text
    Run #file:playwright-mcp-challenge . Browse to http://localhost:3000. Add a todo item with text "Work harder" with category "Work". Make sure the ToDo Item was added to the list. Delete the new ToDo item and make sure it is removed from the list. 
    ```

1. Automate the steps performed by Copilot with this prompt:
    ```text
    Generate a Playwright test case based on the steps you just performed.
    ```

### 🐘 Challenge 2: PostgreSQL MCP server

1. Run the database
    ```bash
    cd postgres-mcp-challenge
    docker compose up
    ```
1. Install PostgreSQL MCP server
    * Open the command palette: Shift+Control+P (Windows), Shift+Command+P (Mac)
    * \> MCP: Add server...
    * Select "Docker image" and enter mcp/postgres
    * "Install mcp/postgres from mcp?" => select "Allow"
    * Postgres URL:
        * Mac: postgresql://postgres:postgres@host.docker.internal:5432/library_app
        * Codespaces / Linux: postgresql://postgres:postgres@172.17.0.1:5432/library_app
    * If you are next asked for port number, database name, username, and password: use values from the URL above
        * Port: 5432
        * Database name: library_app
        * Username: postgres
        * Password: postgres
    * "Enter Server ID" => "Postgres"
    * "Choose where to save the configuration" => select "Workspace settings"
    * mcp.json should be opened by the IDE
    * Start the server by clicking on the play button in mcp.json
    * The tools provided by the MCP server should now be available in the tools menu in the Agent mode prompt box (make sure Agent mode is selected, then click on the wrench icon). You can enable or disable tools by ticking/unticking the boxes.

1. Test e.g. the following prompts using the #query tool provided by PostgreSQL MCP server:
    * "#query what's the schema of my database?"
    * "#query Show all book loans"
    * "#query Show all users who have at least one loan"
    * "#query Generate an entity relationship diagram of the schema in a file called ER.md in Mermaid format"
