$(function(){
  
  function buildHTML(message){
    if (message.image) {
      var html = `
      <div class="message" data-message-id=${message.id}>
        <div class="message__message-info">
          <p class="message__message-info__name">${message.name}</p>
          <p class="message__message-info__date">${message.date}</p>
        </div>
          <p class="message__message-text">${message.body}</p>
          <img class="message__message-img" src=${message.image}>
      </div>`
    } else {
      var html = `
      <div class="message" data-message-id=${message.id}>
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

  if(window.location.href.match(/\/groups\/\d+\/messages/)){
    var reloadMessages = function() {
      last_message_id = $('.message:last').data('message-id');
      console.log(last_message_id);

      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        if(insertHTML.length > 0){
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    };
    setInterval(reloadMessages, 7000);
  }
});