import $ from "jquery";

$(document).ready(function () {
	document.querySelectorAll(".upload-input").forEach((inputElement) => {
		const dropZoneElement = inputElement.closest(".custom-file");

		dropZoneElement.addEventListener("click", (e) => {
			inputElement.click();
		});

		inputElement.addEventListener("change", (e) => {
			if (inputElement.files.length) {
				updateThumbnail(dropZoneElement, inputElement.files[0]);
			}
		});

		dropZoneElement.addEventListener("dragover", (e) => {
			e.preventDefault();
			dropZoneElement.classList.add("hover");
		});

		["dragleave", "dragend"].forEach((type) => {
			dropZoneElement.addEventListener(type, (e) => {
				dropZoneElement.classList.remove("hover");
			});
		});

		dropZoneElement.addEventListener("drop", (e) => {
			e.preventDefault();

			if (e.dataTransfer.files.length) {
				inputElement.files = e.dataTransfer.files;
				updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
			}

			dropZoneElement.classList.remove("hover");
		});
	});

	/**
	 * Updates the thumbnail on a drop zone element.
	 * @param {HTMLElement} dropZoneElement
	 * @param {File} file
	*/

	function updateThumbnail(dropZoneElement, file) {
		let uploadFile = $(dropZoneElement).siblings('.upload-file');
		let image = uploadFile.find('img');
		let closeBtn = uploadFile.find('.upload-file__close');
		const reader = new FileReader();

		// Show thumbnail for image files
		if (file.type.startsWith("image/")) {

			reader.readAsDataURL(file);
			reader.onload = () => {
				$(dropZoneElement).addClass('close');
				uploadFile.addClass('upload');
				image.attr('src', reader.result);

				closeBtn.on('click', () => {
					$(dropZoneElement).removeClass('close');
					uploadFile.removeClass('upload');
					image.attr('src', '');
				});

				console.log(reader)
			};
		} else {
			$(dropZoneElement).removeClass('close');
			uploadFile.removeClass('upload');
		}


	}
});