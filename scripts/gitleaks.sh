#!/bin/sh

docker pull zricethezav/gitleaks:latest
docker run --name gitleaks-eurofuels-front -v $(pwd):/service zricethezav/gitleaks protect --verbose --redact --staged --source=/service
docker rm gitleaks-eurofuels-front