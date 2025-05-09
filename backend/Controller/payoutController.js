const Payout = require('../Model/Payout');
const ServiceProvider = require('../Model/Service_ProviderModel');



const getWeekRange = () => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sun) to 6 (Sat)
  const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);

  const monday = new Date(now.setDate(diffToMonday));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { weekStart: monday, weekEnd: sunday };
};

// Create payouts for all providers
exports.generateWeeklyPayouts = async (req, res) => {
  const { weekStart, weekEnd } = getWeekRange();

  try {
    const providers = await ServiceProvider.find({});
    const payouts = [];

    for (const provider of providers) {
      const weeklyCompleted = provider.completedService.filter(service => {
        const completedAt = new Date(service.completedAt).getTime();
        return completedAt >= weekStart.getTime() && completedAt <= weekEnd.getTime();
      });

      const totalEarnings = weeklyCompleted.length * provider.price;

      if (totalEarnings <= 0 || !provider.upiId) continue;

      const newPayout = new Payout({
        serviceProvider: provider._id,
        upiId: provider.upiId,
        amount: totalEarnings,
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
        status: 'pending',
      });

      await newPayout.save();
      payouts.push(newPayout);
    }

    res.status(200).json({ message: "Weekly payouts generated", payouts });
  } catch (err) {
    console.error("Error generating payouts:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get providers who completed work this week but haven’t been paid
exports.getUnpaidProvidersWithAmountThisWeek = async (req, res) => {
  const { weekStart, weekEnd } = getWeekRange();

  try {
    const allProviders = await ServiceProvider.find({});
    const thisWeekPayouts = await Payout.find({
      weekStartDate: { $gte: weekStart, $lte: weekEnd },
    });

    const paidProviderIds = thisWeekPayouts.map(p => p.serviceProvider.toString());
    const unpaidProviders = [];

    for (const provider of allProviders) {
      if (paidProviderIds.includes(provider._id.toString())) continue;

      const weeklyCompleted = provider.completedService.filter(service => {
        const completedAt = new Date(service.completedAt).getTime();
        return completedAt >= weekStart.getTime() && completedAt <= weekEnd.getTime();
      });

      const totalEarnings = weeklyCompleted.length * provider.price;

      if (totalEarnings <= 0) continue;

      unpaidProviders.push({
        _id: provider._id,
        name: provider.name,
        email: provider.email,
        upiId: provider.upiId,
        unpaidAmount: totalEarnings,
      });
    }

    res.status(200).json(unpaidProviders);
  } catch (err) {
    console.error("Error fetching unpaid providers", err);
    res.status(500).json({ error: err.message });
  }
};
