$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `
      <div class="message">
        <div class="message__message-info">
          <p class="message__message-info__name">${message.name}</p>
          <p class="message__message-info__date">${message.date}</p>
        </div>
          <p class="message__message-text">${message.body}</p>
          <img class="message__message-img" src=${message.image}>
      </div>`
    } else {
      var html = `
      <div class="message">
        <div class="message__message-info">
          <p class="message__message-info__name">${message.name}</p>
          <p class="message__message-info__date">${message.date}</p>
        </div>
          <p class="message__message-text">${message.body}</p>
      </div>`
    }
    return html
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var messages = $('.messages');
      var html = buildHTML(data);
      messages.append(html);
      messages.animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.form__submit-button').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージを入力してください");
      $('.form__submit-button').prop('disabled', false);
    })
  });
});