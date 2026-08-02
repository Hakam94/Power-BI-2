# Part 6 – Connect Power BI Semantic Models to AI Agents

Part 6 continues the Coffee Shop Sales Dashboard series by showing how to use an AI coding agent with a Power BI semantic model safely. The goal is to explore, document, validate, and improve a model while keeping Power BI and GitHub as the source of truth.

## What You Will Learn

- Choose the right Power BI model format for AI-assisted work.
- Connect the Power BI Modeling MCP server to Codex, Claude Code, or Antigravity.
- Inspect model metadata and validate DAX before making changes.
- Use GitHub branches and pull requests to review PBIP/TMDL changes.
- Protect semantic models with read-only mode, backups, and explicit approvals.

## Choose Your Starting Point

| Model location | Best use | Recommended workflow |
| --- | --- | --- |
| **PBIP / TMDL files in GitHub** | Version-controlled development | Recommended. Connect the local MCP server to the `.SemanticModel/definition` folder. |
| **PBIX file open in Power BI Desktop** | Explore or test an existing report | Connect to the live Power BI Desktop model. Keep a backup of the PBIX file. |
| **Fabric / Power BI Service semantic model** | Query a published model | Use your Microsoft Entra account and the permissions already assigned to you. |

For a GitHub project, PBIP is the most reviewable option: model changes are text files that can be compared in a pull request. A PBIX file is supported when open in Power BI Desktop, but it is a binary file and is less convenient for source control.

## 1. Install the Power BI Modeling MCP Server

Microsoft's Power BI Modeling MCP server gives an AI client tools for metadata inspection, DAX validation, and semantic-model operations. Start in **read-only** mode so the agent cannot edit your model.

```text
npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly
```

You need Node.js 20 or later. The first run downloads the MCP package.

## 2. Connect from Your AI Client

### Codex

Register a read-only local MCP server:

```powershell
codex mcp add powerbi-modeling -- npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly
```

Restart Codex or open a new Codex chat after adding the server. Verify it is enabled with:

```powershell
codex mcp list
```

### Claude Code

Add the same local command as a stdio MCP server in Claude Code's MCP settings. Keep `--readonly` while learning the model; only enable write access for a reviewed change.

### Antigravity

Add the server to Antigravity's `mcp_config.json`:

```json
{
  "mcpServers": {
    "powerbi-modeling": {
      "command": "npx",
      "args": [
        "-y",
        "@microsoft/powerbi-modeling-mcp@latest",
        "--start",
        "--readonly"
      ]
    }
  }
}
```

Restart the client after changing MCP configuration and confirm that `powerbi-modeling` appears in its MCP server list.

## 3. Connect to a Model

### PBIP / TMDL

Open the repository folder locally, then use a prompt like:

```text
Open this Power BI semantic model in read-only mode:
C:\path\to\project\MyReport.SemanticModel\definition

List tables, relationships, measures, calculation groups, and potential modeling issues. Do not make changes.
```

### PBIX in Power BI Desktop

Open the PBIX file in Power BI Desktop first. Then use:

```text
Connect read-only to 'MyReport.pbix' in Power BI Desktop.
Document the model and validate the key DAX measures. Do not make changes.
```

### Fabric / Power BI Service

Use an account with access to the workspace and semantic model. The MCP server respects your existing Power BI and Fabric permissions; it does not bypass row-level security or workspace roles.

## 4. A Safe First Conversation

Use these prompts before asking an agent to edit anything:

1. `Describe this semantic model for a business user.`
2. `List all measures with their DAX expressions and identify unused or duplicate measures.`
3. `Check relationships for ambiguous paths, inactive relationships, and many-to-many risks.`
4. `Review the model against Power BI naming and star-schema best practices. Do not change anything.`
5. `Propose a documentation plan in Markdown. Wait for my approval before creating files.`

## 5. Making Changes Safely

When you are ready to edit a PBIP/TMDL model:

1. Create a GitHub branch.
2. Remove `--readonly` only for the current reviewed task.
3. Ask the agent to explain the proposed change first.
4. Approve the change explicitly.
5. Inspect the Git diff.
6. Test the model in Power BI Desktop or Fabric.
7. Commit and open a pull request.

Never use automatic approval or skip-confirmation options for a production semantic model unless you have a tested backup and a clear recovery plan.

## Example: Coffee Shop Dashboard Review

```text
Open the Coffee Shop Sales semantic model in read-only mode.
Review Sales, Profit, MoM Growth, and RLS-related measures.
Return a table with each measure, its DAX purpose, dependencies, and any suggested improvement.
Do not modify the model.
```

## Security Checklist

- Keep secrets, connection strings, and exported data out of prompts and commits.
- Give the AI client only the workspace and model permissions it needs.
- Start in read-only mode.
- Use GitHub pull requests for every PBIP/TMDL change.
- Review AI-generated DAX and query results before publishing.
- Remember that model metadata and query results can be sent to the AI client as conversation context.

## Resources

- [Microsoft Power BI MCP server overview](https://learn.microsoft.com/power-bi/developer/mcp/mcp-servers-overview)
- [Power BI Modeling MCP Server](https://github.com/microsoft/powerbi-modeling-mcp)
- [Power BI Project (PBIP) files](https://learn.microsoft.com/power-bi/developer/projects/projects-overview)
