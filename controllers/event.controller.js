const Event = require("../models/Event");

/**
 * CREATE EVENT (admin)
 */
exports.createEvent = async (req, res) => {
  try {
    const { event_title, date, location } = req.body;

    if (!event_title || !date || !location) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const event = await Event.create({
      event_title,
      date: new Date(date), // pastikan Date
      location,
    });

    res.status(201).json({
      success: true,
      message: "Event berhasil dibuat",
      data: event,
    });
  } catch (error) {
    console.error("[CREATE_EVENT]", error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};

/**
 * GET ALL EVENTS
 */
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // urut berdasarkan tanggal terdekat

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("[GET_EVENTS]", error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};

/**
 * GET SINGLE EVENT (optional tapi berguna)
 */
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("[GET_EVENT_BY_ID]", error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};

/**
 * GET REGISTRANTS EVENT (admin)
 */
exports.getRegistrants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "users",
      "name no_hp email avatarUrl"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event tidak ditemukan",
      });
    }

    res.json({
      success: true,
      total: event.users.length,
      data: event.users,
    });
  } catch (error) {
    console.error("[GET_REGISTRANTS]", error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};

/**
 * REGISTER EVENT (user)
 */
exports.registerEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id; // dari auth middleware

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event tidak ditemukan",
      });
    }

    // Cegah double register
    if (event.users.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User sudah terdaftar",
      });
    }

    event.users.push(userId);
    await event.save();

    res.json({
      success: true,
      message: "Berhasil mendaftar event",
    });
  } catch (error) {
    console.error("[REGISTER_EVENT]", error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};

/**
 * DELETE EVENT (admin)
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Event berhasil dihapus",
    });
  } catch (error) {
    console.error("[DELETE_EVENT]", error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};
