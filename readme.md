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

## Caveats

- This does not account for multi-tenancy - ie if multiple clients are uploading images at once they will overwrite each other. Come up with a unique naming convention and grouping strategy to "keep images together" to mitigate this, and delete them when it's done.

- This also does not perform cleanup. Cleanup happens when the container goes down, however if you have a hot lambda and allow lots of uploads it will probably get overwhelmed eventually. Simply clean up the images when you're done.

- This also performs no compression or size optimization of any kind, which should definitely happen to keep file sizes small.
