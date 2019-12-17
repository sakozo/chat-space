json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
  json.date message.created_at.to_s(:datetime)
  json.name message.user.name
  json.id message.id
end