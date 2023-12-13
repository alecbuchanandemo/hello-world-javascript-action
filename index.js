const core = require('@actions/core');
const { execSync } = require('child_process');

async function main() {
  try {
    const dstatOutput = execSync('dstat --nocolor --noupdate --output dstat.csv 1 1', { encoding: 'utf8' });
    const lines = dstatOutput.split('\n');
    const stats = lines[lines.length - 2].split(',');

    const cpu = stats[3];
    const ram = stats[6];
    const io = stats[8];

    await core.summary
      .addHeading('Resource Usage')
      .addTable([
        [{data: 'Resource', header: true}, {data: 'Usage', header: true}],
        ['CPU', `${cpu}%`],
        ['RAM', `${ram}%`],
        ['I/O', `${io}%`]
      ])
      .write();
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();