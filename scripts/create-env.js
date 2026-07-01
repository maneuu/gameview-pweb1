const fs = require('fs');

const content = `
export const environment = {
  apiUrl: '${process.env.API_URL}'
};
`;

fs.writeFileSync('src/environments/environment.ts', content);
