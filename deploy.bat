7z a -tzip lambda.zip build dist modules node_modules public src *.js
aws s3 cp lambda.zip s3://able-inquiry-test --cache-control=no-cache
aws lambda update-function-code --function-name=able-inquiryprocessservice --s3-bucket=able-inquiry-test --s3-key=lambda.zip --publish