const axios = require('axios');

/**
 * Checks if a given date is a holiday in the given country using Calendarific.
 * Returns true if holiday, false otherwise.
 *
 * Calendarific endpoint:
 * GET https://calendarific.com/api/v2/holidays?api_key=KEY&country=IN&year=YYYY&month=M&day=D
 *
 * (We use year/month/day query params)
 */
async function isHoliday(dateISO /* 'YYYY-MM-DD' */, countryCode = 'IN') {
  try {
    const [year, month, day] = dateISO.split('-').map(Number);
    const res = await axios.get('https://calendarific.com/api/v2/holidays', {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,
        country: countryCode,
        year,
        month,
        day
      },
      timeout: 5000
    });

    // Calendarific returns { meta: {...}, response: { holidays: [...] } }
    const holidays = res.data && res.data.response && res.data.response.holidays;
    if (Array.isArray(holidays) && holidays.length > 0) return true;
    return false;
  } catch (err) {
    // If Calendarific fails, we default to treating it as not a holiday
    console.error('Calendarific error:', err.message || err);
    return false;
  }
}

module.exports = { isHoliday };
