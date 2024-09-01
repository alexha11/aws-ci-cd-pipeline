import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';


export class CiCdAwsPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('alexha11/aws-ci-cd-pipeline', 'main'),
        installCommands: ['npm i -g npm@latest'],
        commands: ['npm ci', 
                   'npm run build', 
                   'npx cdk synth']
      })
    });


  }
}