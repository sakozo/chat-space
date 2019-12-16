json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
  json.date message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
  json.name message.user.name
  json.id message.id
end