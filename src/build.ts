import { exec } from 'child_process';
try {
    exec('cp package.json www/package.json && mkdir www/tmp/ && cd www && zip -r Archive.zip . && cd ..', (error, stdout, stderr) => {
        console.log(error, stderr, stdout)
    });
} catch (error) {
    
}
