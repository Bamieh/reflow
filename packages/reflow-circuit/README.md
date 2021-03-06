# reflow|circuit

queries:
list all projects
  => last ran job
  => last job status
  => github repo
  => jenkins link

list all jobs
  => status of the job
  => number of threads
  => number of flows
  => number of combinations
  => source branch
  => target branch
  => started at
  => completed at

list all flows
  => number of combinations in the flow
  => number of successes
  => number of failures

list all combinations
  => number of success
  => number of failures
  => number of skipped


view report for combination
  => spit reporter output for combination

## Elastic

```bash
curl -XPUT 'localhost:9200/reflow/_mapping/flow?pretty' -H 'Content-Type: application/json' -d'
{"properties":{"duration":{"type":"float"},"endTime":{"type":"date","format":"epoch_millis"},"failures":{"type":"long"},"flowDetails":{"properties":{"id":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}},"fielddata":true},"result":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"title":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}},"jobDetails":{"properties":{"id":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}},"fielddata":true},"numberOfFlows":{"type":"long"},"numberOfThreads":{"type":"long"},"sourceBranch":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"startTime":{"type":"date","format":"epoch_millis"},"targetBranch":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}},"numberOfSuites":{"type":"long"},"passes":{"type":"long"},"pending":{"type":"long"},"result":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"skipped":{"type":"long"},"startTime":{"type":"date","format":"epoch_millis"},"suites":{"properties":{"tests":{"properties":{"code":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"duration":{"type":"long"},"err":{"properties":{"message":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"stacktrace":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}},"result":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"speed":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"title":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}},"title":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}}}}
'
```


```bash
PUT reflow-tracks
{"settings": {"number_of_replicas": 1,"number_of_shards": 2,"refresh_interval": "30s"},
"mappings":{"request":{"properties":{"duration":{"type":"long"},"endTime":{"type":"date","format":"epoch_millis"},"hash":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"header":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"hostname":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"href":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"method":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"pathname":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"port":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"protocol":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"redirects":{"type":"long"},"redirectsList":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"search":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"searchParams":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"startTime":{"type":"date","format":"epoch_millis"},"statusCode":{"type":"long"},"statusMessage":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"jobID":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}}}}
```


## GraphQL

[Example Queries and Mutations](http://localhost:3000/graphiql?query=query%20getJobs%20%7B%0A%20%20jobs(first%3A%205)%20%7B%0A%20%20%20%20result%0A%20%20%20%20startTime%0A%20%20%20%20targetBranch%0A%20%20%20%20trigger%0A%20%20%20%20endTime%0A%20%20%20%20numberOfThreads%0A%20%20%20%20id%0A%20%20%20%20numberOfFlows%0A%20%20%20%20sourceBranch%0A%20%20%20%20tags%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20total%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20getCombination%20%7B%0A%20%20combination(id%3A%20%22P5HyQGABxmP95koTvlEi%22)%20%7B%0A%20%20%20%20pending%0A%20%20%20%20passes%0A%20%20%20%20failures%0A%20%20%20%20suites(first%3A%2010)%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20tests%20%7B%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20body%0A%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20speed%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20err%20%7B%0A%20%20%20%20%20%20%20%20%20%20htmlMessage%0A%20%20%20%20%20%20%20%20%20%20stack%0A%20%20%20%20%20%20%20%20%20%20message%0A%20%20%20%20%20%20%20%20%20%20sourceURL%0A%20%20%20%20%20%20%20%20%20%20line%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20getFlow%20%7B%0A%20%20flow(id%3A%20%221231231%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20result%0A%20%20%20%20passes%0A%20%20%20%20pending%0A%20%20%20%20failures%0A%20%20%20%20combinations%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20result%0A%20%20%20%20%20%20passes%0A%20%20%20%20%20%20pending%0A%20%20%20%20%20%20failures%0A%20%20%20%20%20%20startTime%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20getJob%7B%0A%20%20job(id%3A%20%2287800621-4bdc-42a5-9c78-0f12f484da16%22)%7B%0A%20%20%20%20targetBranch%0A%20%20%20%20trigger%0A%20%20%20%20numberOfThreads%0A%20%20%20%20id%0A%20%20%20%20numberOfFlows%0A%20%20%20%20flows%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20getFlows%20%7B%0A%20%20flow(id%3A%20%2213%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20result%0A%20%20%20%20failures%0A%20%20%20%20pending%0A%20%20%20%20passes%0A%20%20%7D%0A%7D%0A%0Amutation%20insertCombination(%24combination%3A%20CombinationInput!)%20%7B%0A%20%20insertCombination(input%3A%20%24combination)%20%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D%0A&operationName=getCombination&variables=%7B%0A%20%20%22combination%22%3A%20%7B%0A%20%20%20%20%22numberOfSuites%22%3A%2044%2C%0A%20%20%20%20%22startTime%22%3A%20123123123%2C%0A%20%20%20%20%22endTime%22%3A%20123123123%2C%0A%20%20%20%20%22failures%22%3A%2013%2C%0A%20%20%20%20%22pending%22%3A%201%2C%0A%20%20%20%20%22passes%22%3A%207%2C%0A%20%20%20%20%22suites%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22title%22%3A%20%22Suite%20Title%22%2C%0A%20%20%20%20%20%20%20%20%22tests%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20%22Test%20Title%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22result%22%3A%20%22SUCCESS%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22duration%22%3A%2016%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22speed%22%3A%20%22FAST%22%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22jobDetails%22%3A%20%7B%0A%20%20%20%20%20%20%22id%22%3A%201231231231%2C%0A%20%20%20%20%20%20%22startTime%22%3A%20123123123%2C%0A%20%20%20%20%20%20%22sourceBranch%22%3A%20%22master%22%2C%0A%20%20%20%20%20%20%22targetBranch%22%3A%20%22master%22%2C%0A%20%20%20%20%20%20%22numberOfThreads%22%3A%2013%2C%0A%20%20%20%20%20%20%22numberOfFlows%22%3A%201%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22flowDetails%22%3A%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%221231231%22%2C%0A%20%20%20%20%20%20%22title%22%3A%20%22Mobile%22%2C%0A%20%20%20%20%20%20%22result%22%3A%20%22SUCCESS%22%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)
