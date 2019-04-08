define({ "api": [
  {
    "type": "get",
    "url": "/api/issue/all",
    "title": "Retrieve All Issues",
    "version": "1.0.0",
    "group": "Issue",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All issue's successfully retrieved\",\n           \"status\": 200,\n           \"data\": [{\n                       \"issueId\": \"string\",\n                       \"title\": \"string\",\n                       \"description\": \"HTML\",\n                       \"imagePath\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"status\": \"string\",\n                       \"modifiedOn\": Date,\n                       \"createdOn\": \"Date\"\n                   }]\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueAll"
  },
  {
    "type": "get",
    "url": "/api/issue/assignedto",
    "title": "Retrieve All Issues assigned to user",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All Issue assigned to the user retrivied successfully\",\n           \"status\":200,\n           \"data\":[{\n                       \"issueId\": \"string\",\n                       \"title\": \"string\",\n                       \"description\": \"HTML\",\n                       \"imagePath\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"status\": \"string\",\n                       \"modifiedOn\": Date,\n                       \"createdOn\": \"Date\"\n               }]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueAssignedto"
  },
  {
    "type": "get",
    "url": "/api/issue/assignee/remove/:assignId",
    "title": "Remove an Assignee by assignId",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assignId",
            "description": "<p>to be passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Successfully removed assignee from the issue\",\n           \"status\": 201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueAssigneeRemoveAssignid"
  },
  {
    "type": "get",
    "url": "/api/issue/comment/all/:issueId",
    "title": "get All comments on Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All comments retrivied successfully\",\n           \"status\":200,\n           \"data\":[{\n                       \"commentId\": \"string\",\n                       \"comment\": \"string\",\n                       \"issueId\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"createdOn\": \"Date\"\n               }]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCommentAllIssueid"
  },
  {
    "type": "get",
    "url": "/api/issue/count/all",
    "title": "Count of all Issues",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of all the issues retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCountAll"
  },
  {
    "type": "get",
    "url": "/api/issue/count/backlog",
    "title": "Count of issue with backlog status",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of issue in backlog status retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCountBacklog"
  },
  {
    "type": "get",
    "url": "/api/issue/count/byuser",
    "title": "Count of issue added by user",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of issue added by user retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCountByuser"
  },
  {
    "type": "get",
    "url": "/api/issue/count/done",
    "title": "Count of issue with done status",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of issue in done status retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCountDone"
  },
  {
    "type": "get",
    "url": "/api/issue/count/inprogress",
    "title": "Count of issue with in-progress status",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of issue in-progress status retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCountInprogress"
  },
  {
    "type": "get",
    "url": "/api/issue/count/intest",
    "title": "Count of issue with in-test status",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of issue in-test status retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueCountIntest"
  },
  {
    "type": "get",
    "url": "/api/issue/:issueId",
    "title": "Retrieve Single Issues",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL Parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"Issue found successfully\",\n           \"status\":200,\n           \"data\":{\n                       \"issueId\": \"string\",\n                       \"title\": \"string\",\n                       \"description\": \"HTML\",\n                       \"imagePath\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"status\": \"string\",\n                       \"modifiedOn\": Date,\n                       \"createdOn\": \"Date\"\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueIssueid"
  },
  {
    "type": "get",
    "url": "/api/issue/watch/all/:issueId",
    "title": "get All watchers on Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All Watchers retrivied successfully\",\n           \"status\":200,\n           \"data\":[{\n                       \"watcherId\": \"string\",\n                       \"issueId\": \"string\",\n                       \"userId\": \"string\",\n                       \"userName\": \"string\",\n                       \"addedOn\": \"Date\"\n               }]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiIssueWatchAllIssueid"
  },
  {
    "type": "post",
    "url": "/api/issue/add/watch",
    "title": "Add to Watchlist on Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"You were successfully added to watch list for this issue\",\n           \"status\":201,\n           \"data\":{\n                       \"watcherId\": \"string\",\n                       \"issueId\": \"string\",\n                       \"userId\": \"string\",\n                       \"userName\": \"string\",\n                       \"addedOn\": \"Date\"\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueAddWatch"
  },
  {
    "type": "post",
    "url": "/api/issue/assignee/add",
    "title": "Add to Assignee on Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assignedToId",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"New assignee created successfully\",\n           \"status\":201,\n           \"data\":{\n                       \"assignId\": \"string\",\n                       \"issueId\": \"string\",\n                       \"assignedById\": \"string\",\n                       \"assignedByName\": \"string\",\n                       \"assignedToId\": \"string\",\n                       \"assignedToName\": \"string,\n                       \"assignedOn\": \"Date\"\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueAssigneeAdd"
  },
  {
    "type": "post",
    "url": "/api/issue/assignee/all/:issueId",
    "title": "Get all Assignee on Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All assignees retrivied successfully\",\n           \"status\":200,\n           \"data\":[{\n                       \"assignId\": \"string\",\n                       \"issueId\": \"string\",\n                       \"assignedById\": \"string\",\n                       \"assignedByName\": \"string\",\n                       \"assignedToId\": \"string\",\n                       \"assignedToName\": \"string,\n                       \"assignedOn\": \"Date\"\n               }]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueAssigneeAllIssueid"
  },
  {
    "type": "post",
    "url": "/api/issue/comment/create",
    "title": "Create comment on Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"Comment was added successfully\",\n           \"status\":201,\n           \"data\":{\n                       \"commentId\": \"string\",\n                       \"comment\": \"string\",\n                       \"issueId\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"createdOn\": \"Date\"\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueCommentCreate"
  },
  {
    "type": "post",
    "url": "/api/issue/comment/delete/",
    "title": "Delete comment by comment",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Successfully deleted comment\",\n           \"status\": 201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueCommentDelete"
  },
  {
    "type": "post",
    "url": "/api/issue/create",
    "title": "Create Issues",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imagePath",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"New Issue created successfully\",\n           \"status\":201,\n           \"data\":{\n                       \"issueId\": \"string\",\n                       \"title\": \"string\",\n                       \"description\": \"HTML\",\n                       \"imagePath\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"status\": \"string\",\n                       \"modifiedOn\": Date,\n                       \"createdOn\": \"Date\"\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueCreate"
  },
  {
    "type": "post",
    "url": "/api/issue/delete/:issueId",
    "title": "Delete Issue by issueId",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue removed successfully\",\n           \"status\": 201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiIssueDeleteIssueid"
  },
  {
    "type": "put",
    "url": "/api/issue/edit/:issueId",
    "title": "Edit Issues",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imagePath",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"Issue update successfully\",\n           \"status\":201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "PutApiIssueEditIssueid"
  },
  {
    "type": "get",
    "url": "/api/users/all",
    "title": "Retrieve All User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All users fetched successfully\",\n           \"status\": 200,\n           \"data\": [{\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"string\",\n                   \"fullName\": \"firstName lastName\",\n                   \"email\": \"string\",\n                   \"createdOn\": \"Date\",\n                   \"mobileNumber\": \"number\"\n               }]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "GetApiUsersAll"
  },
  {
    "type": "get",
    "url": "/api/users/count/all",
    "title": "number of total signedup users",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count of all users retrieved\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "GetApiUsersCountAll"
  },
  {
    "type": "get",
    "url": "/api/users/:userId",
    "title": "Retrieve Single User by userId",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass userId in URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User found successfully\",\n           \"status\": 200,\n           \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"string\",\n                   \"fullName\": \"firstName lastName\",\n                   \"email\": \"string\",\n                   \"createdOn\": \"Date\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "GetApiUsersUserid"
  },
  {
    "type": "post",
    "url": "/api/users/delete/:userId",
    "title": "Delete Single User by userId",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass userId in URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User deleted successfully\",\n           \"status\": 201,\n           \"data\": null\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiUsersDeleteUserid"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "login User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User logged in successfully\",\n           \"status\": 201,\n           \"data\": {\n               \"authToken\": \"your authToken, which will be valid for next 24hrs\",\n               \"userId\": \"string\",\n               \"expiresIn\": 86395,\n               \"userDetails\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"string\",\n                   \"fullName\": \"firstName lastName\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiUsersLogin"
  },
  {
    "type": "post",
    "url": "/api/users/login/google",
    "title": "Login with Google",
    "version": "1.0.0",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"User created successfully\",\n       \"status\": 201,\n       \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"tring\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiUsersLoginGoogle"
  },
  {
    "type": "post",
    "url": "/api/users/logout",
    "title": "Logout User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User logged out successfully\",\n           \"status\": 201,\n           \"data\": \"null\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiUsersLogout"
  },
  {
    "type": "post",
    "url": "/api/users/signup",
    "title": "SignUp User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"User created successfully\",\n       \"status\": 201,\n       \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"tring\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiUsersSignup"
  },
  {
    "type": "put",
    "url": "/api/users/edit/:userId",
    "title": "Edit Single User by userId",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass userId in URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "details_to_edit",
            "description": "<p>details should be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User updated successfully\",\n           \"status\": 201,\n           \"data\": \"null\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PutApiUsersEditUserid"
  }
] });
