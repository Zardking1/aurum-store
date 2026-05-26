const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Get engraving options
router.get('/options', (req, res) => {
  try {
    const engravingOptions = {
      locations: [
        { id: 'outside', label: 'Outside' },
        { id: 'inside', label: 'Inside' },
      ],
      fontStyles: [
        { id: 'classic', name: 'Classic Serif', style: 'serif' },
        { id: 'luxe', name: 'Luxe Script', style: 'script' },
        { id: 'modern', name: 'Modern Calligraphy', style: 'calligraphy' },
      ],
      maxCharacters: 50,
      acceptedCharacters: 'A-Z, a-z, 0-9, spaces, & - \' . , !',
    };

    res.json(engravingOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate engraving text
router.post('/validate', auth, (req, res) => {
  try {
    const { text, fontStyle, location } = req.body;

    if (!text || !fontStyle || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (text.length > 50) {
      return res.status(400).json({ message: 'Text exceeds maximum length of 50 characters' });
    }

    // Check for invalid characters
    const validCharacters = /^[A-Za-z0-9\s&\-'.!,]*$/;
    if (!validCharacters.test(text)) {
      return res.status(400).json({ message: 'Text contains invalid characters' });
    }

    res.json({
      isValid: true,
      preview: {
        text,
        fontStyle,
        location,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Preview engraving
router.post('/preview', auth, (req, res) => {
  try {
    const { productId, text, fontStyle, location } = req.body;

    // In a real application, you would generate an image preview here
    const preview = {
      productId,
      text,
      fontStyle,
      location,
      previewUrl: `/api/engraving/preview/${productId}?text=${text}&font=${fontStyle}`,
    };

    res.json(preview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
