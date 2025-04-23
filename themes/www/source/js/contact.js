document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('contactForm').addEventListener('submit', contactSubmit)
  function contactSubmit(event){
      console.log(event);
      var data = {}
      var name = document.getElementById('name').value
      var from = document.getElementById('email').value
      var tel = document.getElementById('tel').value
      var areaWork = document.getElementById('areaWork').value
      var reported  = document.getElementById('reported').value
      var subtopic = document.getElementById('subtopic').value
      var entity = document.getElementById('entity').value
      var number = document.getElementById('number').value
      var msg = document.getElementById('msg').value
      var direction = document.getElementById('direction').value
      
      if (!name || !name.length) {
        var name = 'Sin nombre';
      }
      var text = 'Nombre: ' + name + '\n';
      console.log(text);
      text += 'Email: ' + from + '\n';
      if (tel && tel.length) text += 'Telefono: ' + tel + '\n';
      if (areaWork && areaWork.length) text += 'Área / Departamento de trabajo: ' + areaWork + '\n';
      if (reported && reported.length) text += 'Nombre y apellidos de la persona denunciada: ' + reported + '\n';
      if (subtopic && subtopic.length) text += 'Subtema: ' + subtopic + '\n';
      if (entity && entity.length) text += 'Entidad: ' + entity + '\n';
      if (number && number.length) text += 'Expediente: ' + number + '\n';
      if (direction && direction.length) text += 'Dirección: ' + direction + '\n';


      if (selectedFaq.dni === 'true') {
        var dniNumber = document.getElementById('dniNumber').value
        text += 'DNI: ' +dniNumber + '\n';
        console.log(dniNumber);
        var dni = document.getElementById('dni');
        if (!dni.files.length && !dniNumber.trim().length) {
          event.preventDefault();
          alert('ERROR: archivo o dni es obligatorio');
          return false;
        }
      }

      if (selectedFaq.complaint === 'true') {
        var relation = document.getElementById('relation').value
        if (relation === 'null') {
          event.preventDefault();
          alert('ERROR: Relación con Garsa es obligatorio');
          return false;
        }
        text += 'Relación con Garsa: ' +relation + '\n';
        console.log(relation);
      }

      if (selectedFaq.complaint === 'true') {
        var channel = document.getElementById('channel').value
        if (channel === 'null') {
          event.preventDefault();
          alert('ERROR: Dirección o medio para las notificaciones es obligatorio');
          return false;
        }
        text += 'Dirección o medio para las notificaciones: ' +channel + '\n';
        console.log(channel);
      }

      if (selectedFaq.complaint === 'true') {
        var infringement = document.getElementById('infringement').value
        if (infringement === 'null') {
          event.preventDefault();
          alert('ERROR: Tipo de infracción es obligatorio');
          return false;
        }
        text += 'Tipo de infracción: ' +infringement + '\n';
        console.log(infringement);
      }

      if (msg && msg.length) text += 'Mensaje: \n' + msg + '\n';

      console.log(from);
      console.log(selectedFaq.subject + ' --- ' + Date.now());
      console.log(text);

      var formData = new FormData();
      formData.append('from', from);
      formData.append('subject', selectedFaq.subject + ' --- ' + Date.now());
      formData.append('text', text);

      var dni = document.getElementById('dni');
      console.log(dni);
      var fileAll = document.getElementById('fileAll');
      console.log(fileAll);
      var size = 0;
      if (dni) {
        for (var i = 0; i < dni.files.length; i++) {
          console.log('DNI ALL: ', dni.files[i]);
          formData.append('dni'+i, dni.files[i]);
          size += dni.files[i].size;
        }
      }
      if (fileAll) {
        for (var i = 0; i < fileAll.files.length; i++) {
          console.log('FILE ALL: ', fileAll.files[i]);
          formData.append('file'+i, fileAll.files[i]);
          size += fileAll.files[i].size;
        }
      }

      if (size > 10000000) {
        event.preventDefault();
        alert('ERROR: El tamaño de los archivos excede los 10MB');
        return false;
      }

      fetch(contactUrl + '-form',{
          method: 'POST',
          body: formData
      }).then(function(){
          alert('Gracias, pronto nos pondremos en contacto.');
          document.getElementById('contactForm').reset()
          gtag('event', 'enviar', { 'event_category': 'formulario', 'event_label': 'contacto', 'value': '0'});
      })
      event.preventDefault();
  }
})