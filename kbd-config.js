let kbd_config = {
    "points": {
        "zones": {
            "rights": {
                "columns": {
                    "outer2": null,
                    "outer1": null
                },
                "rows": {
                    "ctrl.asym": "clone",
                    "bottom.asym": "clone",
                    "home.asym": "clone",
                    "top.asym": "clone",
                    "num.asym": "clone",
                    "fn": {
                        "asym": "clone",
                        "shift": [
                            0,
                            5
                        ]
                    }
                }
            },
            "outer": {
                "anchor": {
                    "ref": "rights_outer1_ctrl",
                    "shift": [
                        19,
                        0
                    ]
                },
                "columns": {
                    "outer": null
                },
                "rows": {
                    "ctrl": null,
                    "bottom": null,
                    "home": null,
                    "top": null,
                    "num": null,
                    "fn": {
                        "shift": [
                            0,
                            5
                        ]
                    }
                }
            },
            "matrix": {
                "anchor": {
                    "ref": "outer_outer_bottom",
                    "shift": [
                        19,
                        0
                    ]
                },
                "columns": {
                    "pinky": null,
                    "ring.key.stagger": 6,
                    "middle.key.stagger": 5,
                    "index.key.stagger": -5,
                    "inner.key.stagger": 0
                },
                "rows": {
                    "bottom": null,
                    "home": null,
                    "top": null,
                    "num": null,
                    "fn": {
                        "shift": [
                            0,
                            5
                        ]
                    }
                }
            },
            "thumbfan": {
                "anchor": {
                    "ref": "matrix_inner_bottom",
                    "shift": [
                        -19,
                        -21
                    ]
                },
                "columns": {
                    "nearest": null,
                    "near": null,
                    "home.key": {
                        "spread": 19,
                        "splay": -35,
                        "origin": [
                            -11.75,
                            -9
                        ]
                    },
                    "far.key": {
                        "spread": 19,
                        "splay": -35,
                        "origin": [
                            -9.5,
                            -9
                        ]
                    }
                },
                "rows": {
                    "thumb": null
                }
            }
        },
        "mirror": {
            "ref": "matrix_index_num",
            "distance": 160
        }
    },
    "outlines": {
        "outline": {
            "main": {
                "what": "rectangle",
                "where": true,
                "size": 33,
                "bevel": 3
            },
            "min": {
                "what": "rectangle",
                "where": true,
                "bound": false,
                "size": 14,
                "operation": "subtract"
            }
        }
    },
    "cases": {
        "board4": [
            {
                "name": "outline",
                "extrude": 1.5
            }
        ]
    }
}

return kbd_config
