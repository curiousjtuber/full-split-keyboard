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
        "outer": {
            "anchor": {
                "ref": "rights_outer1_ctrl",
                "shift": [u, 0]
            },
            "columns": {
                "outer": null,
                "pinky": null,
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
                "ref": "outer_pinky_bottom",
                "shift": [u, 0]
            },
            "columns": {
                "ring.key.stagger": 11,
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

const subkeys = {
    "what": "rectangle",
    "where": "-/^rights/",
    "bound": false,
    "size": 14,
    "operation": "subtract"
}

const expand = 17
const joints = 2
const outlines = {
    "upper_left": {
        "poly_left": {
            "what": "polygon",
            "points": [
                "thumbfan_furthest_thumb",
                "rights_outermost_ctrl",
                "rights_outermost_fn",
                "matrix_middle_fn",
                "matrix_inner_fn"
            ],
            "expand": expand,
            "joints": joints
        },
        "subkeys": subkeys
    },
    "upper_right": {
        "poly_right": {
            "what": "polygon",
            "points": [
                "mirror_thumbfan_furthest_thumb",
                "mirror_rights_outermost_ctrl",
                "mirror_rights_outermost_fn",
                "mirror_matrix_middle_fn",
                "mirror_matrix_inner_fn"
            ],
            "expand": expand,
            "joints": joints
        },
        "subkeys": subkeys
    },
    "test_left": {
        "test": {
            "what": "rectangle",
            "where": "-/(^mirror)|(^rights)/",
            "size": 33,
            "bevel": 5
        },
        "subkeys": subkeys
    },
    "test_left_tilt": {
        "test": {
            "what": "rectangle",
            "where": "-/(^mirror)/",
            "size": 33,
            "bevel": 5
        },
        "subkeys": subkeys
    },
    "test_right": {
        "test": {
            "what": "rectangle",
            "where": "/^mirror/",
            "size": 33,
            "bevel": 5
        },
        "subkeys": subkeys
    }
}

const extrude = 1.5
var cases = {}
for (const outline in outlines) {
    if (Object.hasOwn(outlines, outline)) {
        cases[outline] = [
            {
                "name": outline,
                "extrude": extrude
            }
        ]
    }
}


let kbd_config = {
    "points": points,
    "outlines": outlines,
    "cases": cases
}

return kbd_config
