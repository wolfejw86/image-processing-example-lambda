## host imagemagick layer

aws cloudformation create-stack --stack-name image-processing-layer --template-body file://./cf.json

## install the rest

npm i -g @architect/architect aws-sdk

npm i

arc deploy

## view logs for uploads

arc logs ./src/http/post-upload
