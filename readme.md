## host imagemagick layer

aws cloudformation create-stack --stack-name image-processing-layer --template-body file://./cf.json

## Reference your new layer in your app.arc (your actual layer value will be different)

```
@aws
region us-east-1
layers arn:aws:lambda:us-east-1:742079469910:layer:image-magick:2
```

## install the rest

npm i -g @architect/architect aws-sdk

npm i

arc deploy

## view logs for uploads

arc logs ./src/http/post-upload
