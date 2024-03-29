# Elastic Scraper

A 'stretchable' scraper, that can source data from heterogenous sources and standardize before storage for consumption by ML pipelines.

## Requirements

### Primary

- ✅ must support heterogenous feedback sources (Intercom, Play Store, Twitter, Discourse etc)
- ❓ [push and pull integration model](https://resources.boomi.com/resources/home/push-vs-pull-avoid-misunderstandings-in-your-integration-efforts)
- ✅ Multi-tenancy
- ✅ metadata ingestion — each source has different metadata
- ✅ transformation to an internal structure, which should
    - ✔ support different types of feedback
    - ✔ support source specific metadata
    - ✔ have common record level attributes (language, source, info etc.)

### Additional

- ✅ Idempotency
- ✅ Multiple feedback sources from same platform, eg. from two Play Store apps for the same user

## Initial Thoughts
- Identify common attributes among the different sources of feedback, first principles approach on what constitutes a feedback. These core attributes will form the feedback schema, while the rest would constitute the metadata schema.
- identification of functionalities :
    1. scraping from source
        - different sources would need different handling, should be scalable to new sources
        - need to think about source specification and handlers
    2. metadata processing, there needs to be a scalable service that processes data and converts it into ML pipeline consumable formats
    3. breakdown into common record level attributes and source specific attributes
    4. pushing processed data to store
        - database should be scalable to new sources, channel agnostic
        - fetching should be optimized for retrieval

## System Design

![high-level-diagram](./resources/high-level-diagram.png)

Taking a microservice based approach to ensure scalability and failure tolerance. Multi-instance deployments can also provide multi-tenancy, which is a key requirement. The components I planned:

- a scraper micro-service which has source-specific black box functions available for scraping
- a load balancer to balance scraping requests between different instances our scraper service
- a data processing service to consume scraped data, convert it into storable formats, and store it to DB
- a logging service to store logs from different services
- a map management service/tool
- a queuing service with the following queues:
    - scraped data queue : fed by scraper service, consumed by data processing service
    - logging queue : fed by scraper service and processing service, consumed by logging service
- a data store, written to by data processing service
- a log store, written to by the logging service
- a map store, read by data processing service, written to and read by map management service

## Control Flow
- a trigger sends a request to scrape content 
- the load balancer receives this content and distributes the request to a free instance of the scraper service
- the scraper service processes the requests, chunks messages, and sends them to the data queue
- the scraper service also queues info and error logs to the log queue
- multiple instances of the data processing service constantly poll the data queue
- when a message arrives in the data queue, it is consumed by a free instance of the data processing service
- the data processing requests the map management service to send the request specific map
- the map management service looks up the specific map for the source and returns it
- this map is cached at the data processing service level 
- the consumed data is processed and converted into standardized feedback and metadata formats
- the converted data is pushed to the data store
- throughout this process, logs are queued to the logging queue
- the logging service constantly polls for logs and stores them / pushes them to a monitoring tool

## Other Flows

### Adding a new source (or any CRUD operation on sources)
- provide a plugin function to scraper-service to fetch data from the source.
- use the map management service to create a new map for the new source.
- send requests!

## Deployment Approach

All the services are dockerized, and a bare-bones docker-compose has been provided for deployment. The easiest way to deploy this tool is to `docker-compose up` on a server, after making suitable modifications to the `docker-compose` file, providing suitable scaling for the different services and an environment file.

But I recommend deploying each service individually on an elastic deployment service provider, like AWS ECS. Auto-scaling and monitoring services would be much easier. Workflows can be cerated for this repository to directly push docker images of different services to AWS, from where, highly scalable deployments on ECS can be automated (ideally) after testing.

## Future Extensions

- Add functionality to crawl the web for non-standardized sources, like, a product review on a personal blog posted on an an  early-adopter's website.
- Add functionality to source non-textual data, audio/video feedback. Tap into mentions of target product on podcasts, youtube reviews etc.

## Drawbacks

- Metadata, although stored for each source, isn't easily consumable. There can be approaches to improve on metadata storage.
- There is further scope for simplification of the scraper service, by standardizing how a source is scraped and introducing plugins for new sources.
- Tests haven't been written yet