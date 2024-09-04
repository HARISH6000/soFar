const JournalEntry = require('../models/JournalEntry');

exports.getEntries = async (req, res) => {
    try {
        const entries = await JournalEntry.find({ user: req.user.id });
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createEntry = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newEntry = new JournalEntry({
            user: req.user.id,
            title,
            content,
        });

        const entry = await newEntry.save();
        res.json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateEntry = async (req, res) => {
    const { title, content } = req.body;

    try {
        let entry = await JournalEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        entry = await JournalEntry.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        res.json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        let entry = await JournalEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await JournalEntry.findOneAndDelete({ _id: req.params.id});
        ;

        res.json({ message: 'Entry removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
