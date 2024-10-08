const tab_gap = 5
const u = 19

const points = {
    "zones": {
        "rights": {
            "columns": {
                "outermost": null,
                "outer2": null,
                "outer1": null
            },
            "rows": {
                "ctrl.asym": "right",
                "bottom.asym": "right",
                "home.asym": "right",
                "top.asym": "right",
                "num.asym": "right",
                "fn": {
                    "asym": "right",
                    "shift": [0, tab_gap]
                }
            }
        },
        "outer": {
            "anchor": {
                "ref": "rights_outer1_ctrl",
                "shift": [u, 0]
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
                    "shift": [0, tab_gap]
                }
            }
        },
        "matrix": {
            "anchor": {
                "ref": "outer_outer_bottom",
                "shift": [u, 0]
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
                    "shift": [0, tab_gap]
                }
            }
        },
        "thumbfan": {
            "anchor": {
                "ref": "matrix_inner_bottom",
                "shift": [-19, -21]
            },
            "columns": {
                "near": null,
                "home": null,
                "far.key": {
                    "shift": [-u + 17.5, -16],
                    "rotate": -55
                },
                "furthest.key": {
                    "shift": [-u + 4, -16 - 22],
                    "rotate": -80
                }
            },
            "rows": {
                "thumb": null
            }
        }
    },
    "mirror": {
        "ref": "thumbfan_furthest_thumb",
        "distance": 50
    }
}


const outlines = {
    "upper": {
        "poly_left": {
            "what": "polygon",
            "points": [
                "thumbfan_furthest_thumb",
                "outer_outer_ctrl",
                "outer_outer_fn",
                "matrix_middle_fn",
                "matrix_inner_fn"
            ],
            //"expand": 20
        },
        "poly_right": {
            "what": "polygon",
            "points": [
                "mirror_thumbfan_furthest_thumb",
                "mirror_rights_outermost_ctrl",
                "mirror_rights_outermost_fn",
                "mirror_matrix_middle_fn",
                "mirror_matrix_inner_fn"
            ],
            "expand": 17,
            "joints": 2
        },
        // "main": {
        //   "what": "rectangle",
        //   "where": true,
        //   "size": 33,
        //   "bevel": 5
        // },
        "min": {
            "what": "rectangle",
            "where": true,
            "bound": false,
            "size": 14,
            "operation": "subtract"
        }
    }
}

const cases = {
    "upper6": [
        {
            "name": "upper",
            "extrude": 1.5
        }
    ]
}

let kbd_config = {
    "points": points,
    "outlines": outlines,
    "cases": cases
}

return kbd_config
