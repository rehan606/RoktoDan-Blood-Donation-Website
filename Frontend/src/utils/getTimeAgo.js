const getTimeAgo = (date, language) => {
    const days = Math.floor(
        (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24)
    );

    if (language === "bn") {
        if (days === 0) return "আজ পোস্ট করা";
        if (days === 1) return "১ দিন আগে";
        return `${days} দিন আগে`;
    } else {
        if (days === 0) return "Posted today";
        if (days === 1) return "1 day ago";
        return `${days} days ago`;
    }
};

export default  getTimeAgo ;