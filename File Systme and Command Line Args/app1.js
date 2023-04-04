console.log(process.argv); 
// argv --> argument vector

const command = process.argv[2];
if(command === 'add'){
    console.log('Adding notes...');
} else if (command === 'remove'){
    console.log('Removing notes');
}

// Run commands in terminal
// node app1.js add
// node app1.js add --title="Dummy title"