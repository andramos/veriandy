// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function() {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});

// Photo Filter
var screenWidth = $(window).width();
var activeFilter = "all";

// se aplica filtro si la pantalla es pequeña para que no aparezcan muchas fotos
filterItems(screenWidth < 700 ? "cuatro" : "all");
markButton(screenWidth < 700 ? "cuatro" : "all");

$(window).resize(function() {
  screenWidth = $(window).width();
  let newFilter = activeFilter;
  if (activeFilter === "all" && screenWidth < 700) {
    newFilter = "cuatro";
    markButton(activeFilter);
    filterItems(activeFilter);
  }
});

function markButton(filter) {
  $(".ww-filter-button").each(function() {
    if ($(this).data("filter") === filter) {
      $(this).removeClass("btn-outline-primary");
      $(this).addClass("btn-primary");
    } else {
      $(this).removeClass("btn-primary");
      $(this).addClass("btn-outline-primary");
    }
  });
}

$(".ww-filter-button").on("click", function(e) {
  // remove btn-primary from all buttons first
  $(".ww-filter-button").removeClass("btn-primary");
  $(".ww-filter-button").addClass("btn-outline-primary");

  // add btn-primary to active button
  var button = $(this);
  button.removeClass("btn-outline-primary");
  button.addClass("btn-primary");
  filterItems(button.data("filter"));
  e.preventDefault();
});

function filterItems(filter) {
  if (filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $(".ww-gallery .card").each(function() {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if (filter === "all") {
      show = true;
    } else {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);
    setTimeout(function() {
      if (show && !card.is(":visible")) {
        card.fadeIn(400);
      }
    }, 500);
  });
}

// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Navbar
// Close Navbar when clicked outside
$(window).on('click', function(event){
  // element over which click was made
  var clickOver = $(event.target)
  if ($('.navbar .navbar-toggler').attr('aria-expanded') == 'true' && clickOver.closest('.navbar-toggler').length === 0) {
      // Click on navbar toggler button
      $('button[aria-expanded="true"]').click();
  }
});


simplyCountdown(".my-super-countdown", {
    year: 2025,
    month: 9,
    day: 6,

    // Words customization
    words: {
      days: {
          // Function to handle pluralization
          lambda: (root, count) => (count > 1 ? root + "s" : root),
          root: "día",
      },
      hours: {
          lambda: (root, count) => (count > 1 ? root + "s" : root),
          root: "hora",
      },
      minutes: {
          lambda: (root, count) => (count > 1 ? root + "s" : root),
          root: "minuto",
      },
      seconds: {
          lambda: (root, count) => (count > 1 ? root + "s" : root),
          root: "segundo",
      },
  },
});

document.getElementById('myForm').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());

  if (!formObject.guest1 || !formObject.email) {
    displayFeedback('Por favor, completa los campos obligatorios.', 'error');
    return;
  }

  try {
    const response = await fetch('https://saveformdata-4uupwi46eq-ew.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    });

    await response.json();

    if (response.ok) {
      displayFeedback(`¡Gracias! Contamos contigo`, 'success');
      disableInputs();
    } else {
      displayFeedback(`Ha habido un error feo, no se pudo enviar la información`, 'error');
    }

  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    displayFeedback('¡Vaya! Un error inesperado. Por favor, inténtalo de nuevo a ver si así...', 'error');
  }
}

function displayFeedback(message, type = 'info') {
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.textContent = message;
  feedbackDiv.className = `feedback ${type}`;
}

function disableInputs() {
  const inputs = document.querySelectorAll(
    '#myForm input, #myForm #guest-input-main, #myForm #guest-input-secondary, #myForm textarea, #myForm button[type="submit"]'
  );
  inputs.forEach(input => {
    input.disabled = true;
  });
}