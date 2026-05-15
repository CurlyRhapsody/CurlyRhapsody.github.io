const colorBlindnessMatrices = {
    protanopia: [ // Red-Colorblindness
      0.56667, 0.43333, 0,
      0.55833, 0.44167, 0,
      0,       0.24167, 0.75833
    ],
    deuteranopia: [ // Green-Colorblindness
      0.625, 0.375, 0,
      0.7,   0.3,   0,
      0,     0.3,   0.7
    ],
    tritanopia: [ // Blue-Colorblindness
      0.95, 0.05, 0,
      0,    0.43333, 0.56667,
      0,    0.475,   0.525
    ],
    achromatopsia: [ // Full colorblind
      0.2126, 0.7152, 0.0722,
      0.2126, 0.7152, 0.0722,
      0.2126, 0.7152, 0.0722
    ]
  };