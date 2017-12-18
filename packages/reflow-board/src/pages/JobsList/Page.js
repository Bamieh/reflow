import React, {PureComponent} from 'react';
import Job from '../../components/Job'
import JobsList from '../../containers/JobsList';
import FlowsList from '../../containers/FlowsList';

class Page extends PureComponent {
  render() {
    const { match } = this.props;
    const projectName = match.params.projectName;
    const selectedJobID = match.params.jobID;

    return (
      <div className="row">
        <div className="col-xs-4">
          {/*<JobsList projcetName={projectName} />*/}
        </div>
        <div className="col-xs-8">
          <FlowsList key={selectedJobID} jobID={selectedJobID} />
                {/*props.jobID &&false && <div style={{height: 120}}>
        <h4>Job Details</h4>
        <div className="row">
          <div className="col-xs-6">
            <ul>
              <li>Target Branch: {job.targetBranch}</li>
              <li>Trigger: {job.trigger}</li>
            </ul>
          </div>
          <div className="col-xs-6">
            <ul>
              <li># Threads: {job.numberOfThreads}</li>
              <li># Flows: {job.numberOfFlows}</li>
            </ul>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    );
  }
}

export default Page
