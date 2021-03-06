## Install &  Setup

gulp && gulp watch

## server start

node server

## API
### Question list request example

GET `/api/questions/`

### Response example
```javascript
{
    "fields": [{
        "id": 0,
        "type": "statement" | "textfield" | "list" | "images-list" | "section" | "boolean" | "score" | "range",
        "required": true | false,
        "multiple": true | false,
        "quick-validate": true | false,
        "icon": "icon-name" | null,  // if "type":"score" - we can choose icon from FontAwesome
        "maximum": 6 | null,  // if "type":"score" - we can put `5` we have 5 stars, 8 we have 8 stars
        "min": 0 | null,  // "type":"range"
        "max": 8 | null,  // "type":"range"
        "labels": {
            0: "weak", 4: "medium", 8: "strong"
        } | null,  // "type":"range"
        "question": "",
        "description": "",
        "choices": [{
            "id": 0,
            "label": "",
            "image": "src" | null
        }] | null,
        "attachment": {
            "type": "audio" | "video" | "image",
            "src_poster": "image_src",
            "src_path": "file_src",
            "src_type": "youtube" | "vimeo" | "file_extension",
            "src_id": "youtube_video_id" | "vimeo_video_id" | null
        } | null
    }]
}
```

### Answer reply request example

GET `/api/check-question/?id=0&value=input_val`

`value = input_val | [choices_ids]`

### Response example
```javascript
{
    "go_to_another_question": 0 | null,
    "total_progression": 0 | null,
    "result": {
        "status": "success" | "error",
        "msg": ""
    }
}
```
