// 代码生成时间: 2025-10-10 02:49:34
// Import required modules
const fs = require('fs');
const path = require('path');

// Define a function to generate documentation for a given Angular controller
function generateDocumentationForController(controller) {
    let documentation = `## ${controller.name} Controller

`;

    // Iterate over controller methods to document them
    controller.methods.forEach(method => {
        documentation += `### ${method.name} Method

`;
        documentation += `**Description:** ${method.description}

`;
        documentation += `**Parameters:**
`;

        method.parameters.forEach(param => {
            documentation += `- ${param.name}: ${param.type} (${param.description})
`;
        });

        documentation += `
**Returns:** ${method.returnType} (${method.returnDescription})

`;
    });

    return documentation;
}

// Define a function to scan controllers and generate documentation
function generateApiDocumentation(controllers) {
    let documentation = `# API Documentation

`;

    controllers.forEach(controller => {
        documentation += generateDocumentationForController(controller);
    });

    // Write the documentation to a file
    fs.writeFile('api_documentation.md', documentation, (err) => {
        if (err) {
            console.error('Error writing documentation file:', err);
        } else {
            console.log('API documentation generated successfully.');
        }
    });
}

// Define a sample controller structure for demonstration purposes
const sampleControllers = [
    {
        name: 'UserService',
        methods: [
            {
                name: 'getUser',
                description: 'Retrieves a user by ID',
                parameters: [
                    { name: 'userId', type: 'string', description: 'The ID of the user' }
                ],
                returnType: 'User',
                returnDescription: 'The user object'
            }
        ]
    }
];

// Generate documentation
generateApiDocumentation(sampleControllers);