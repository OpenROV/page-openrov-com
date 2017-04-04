$(document).ready(function () {
    (function(){
        $.get('https://openrov.zendesk.com/embeddable/ticket_fields?locale=en')
            .done(function(fieldIdsResult){
                fieldIdsResult.forEach(
                    function(field) {
                        if (field.type == "text" && field.title_in_portal =="Name") {
                            $('#nameInput').data('id', field.id);
                        }
                        if (field.type == "tagger") {
                            var control = $('#typeInput');
                            control.data('id', field.id);
                            control.append(field.custom_field_options.map(function(o) {
                                return '<option value="' + o.value+ '">' + o.name +'</option>'
                            }));

                        }
                    })
            })

        var submitedFrom = '\n\n------------------\nSubmitted from: ' + location;
        $('#modal-contactSupport input[type=submit]').on('click', function(ev) {
            ev.preventDefault();

            $('#nameInput').parent().toggleClass('has-error', false)
            $('#emailInput').parent().toggleClass('has-error', false)
            $('#subjectInput').parent().toggleClass('has-error', false)
            $('#descriptionInput').parent().toggleClass('has-error', false)
            $('#typeInput').parent().parent().toggleClass('has-error', false)
            var error = false;
            try {
                var name = $('#nameInput').val();
                if (name.trim().length == 0) { $('#nameInput').parent().toggleClass('has-error', true); error = true; }

                var email = $('#emailInput').val();
                if (email.trim().length == 0) { $('#emailInput').parent().toggleClass('has-error', true); error = true; }
                
                var subject = $('#subjectInput').val();
                if (subject.trim().length == 0) { $('#subjectInput').parent().toggleClass('has-error', true); error = true; }

                var description = $('#descriptionInput').val();
                if (description.trim().length == 0) { $('#descriptionInput').parent().toggleClass('has-error', true); error = true; }

                var type = '';
                $($('#typeInput')[0]).children().toArray().forEach(function(child) {
                    if (child.selected) {
                        if (child.value) {
                            type = child.value
                        }
                    }
                })
                if (type.trim().length == 0) { $('#typeInput').parent().parent().toggleClass('has-error', true); error = true; }

                var nameId = $('#nameInput').data('id');
                var typeId = $('#typeInput').data('id');
                var request = {
                            "subject": subject, 
                            "tags": ["web_widget"], 
                            "via_id": 48, 
                            "comment": { 
                                "body": description + submitedFrom, 
                            }, 
                            "requester": 
                            { 
                                "name": name, 
                                "email": email, 
                                "locale_id": 1 
                            }, 
                            "fields": { 
                            } 
                        }
                request.fields[nameId] = name;
                request.fields[typeId] = type;

                if (error) return;

                $('#submitter').prop('disabled', true);
                $.ajax({
                    type: "POST",
                    url: 'https://openrov.zendesk.com/api/v2/requests.json',
                    data: JSON.stringify( {request: request}),
                    dataType: 'json',
                    contentType: "application/json",
                    beforeSend: function(xhr) { 
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(email +'/token:BO4MEQQtX70i6kDJqFmUb5voRNo8OPs2qcyGISBz')); 
                        }
                }
                )
                .done(function(res) {
                    alert("Thank you for your support request. You will hear from us shortly.");
                    $('#modal-contactSupport').modal('hide');
                })
                .fail(function(err) {
                    alert('Whoops, something went wrong. Please try again later.')
                })
                
            }
            catch(err) {
                console.error(err);
                return;
            }
            if (error) { return }


        })
           

    })()
});
