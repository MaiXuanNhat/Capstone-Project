const userSchema = {
    name: { type: 'string', optional: true },
    email: { type: 'string', optional: true },
    password: { type: 'string', optional: true },
    role: { type: 'number', optional: true },
    is_verified: { type: 'boolean', optional: true },
    deleted_at: { type: 'string', optional: true },
}

const userInfoSchema = {
    user_id: { type: 'number', optional: true },
    avatar: { type: 'string', optional: true },
    birthday: { type: 'string', optional: true },
    address: { type: 'string', optional: true },
    phone_number: { type: 'string', optional: true },
    gender: { type: 'number', optional: true },
}

const playlistSchema = {
    user_id: { type: 'number', optional: true },
    title: { type: 'string', optional: true },
    description: { type: 'string', optional: true },
}

const historySchema = {
    user_id: { type: 'number', optional: true },
    song_id: { type: 'number', optional: true },
    duration: { type: 'number', optional: true },
}

module.exports = {
    userSchema: userSchema,
    userInfoSchema: userInfoSchema,
    playlistSchema: playlistSchema,
    historySchema: historySchema,
}
