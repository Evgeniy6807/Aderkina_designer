document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formBid');

    // Защита: если формы нет на странице, скрипт завершает работу
    if (!form) return;

    const checkbox = document.getElementById('privacyCheckbox');
    const errorToast = document.getElementById('errorToast');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = form.querySelector('.button-input');

    form.addEventListener('submit', (event) => {
        // МГНОВЕННО блокируем стандартную отправку и перезагрузку страницы браузером
        event.preventDefault();

        // 1. Проверяем HTML-валидацию браузера
        if (!form.checkValidity()) {
            return;
        }

        // 2. Если текстовые поля в порядке, отменяем перезагрузку страницы(переносим выше в начало)
        // event.preventDefault();

        // Сбрасываем прошлые состояния (добавляем класс скрытия)
        errorToast.classList.add('is-hidden');
        successMessage.classList.add('is-hidden');

        // 3. Валидация чекбокса: если он НЕ отмечен
        if (!checkbox.checked) {
            errorToast.classList.remove('is-hidden'); // Показываем ошибку
            checkbox.focus();
            return;
        }

        // 4. Имитация AJAX-отправки
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.style.opacity = '0.7'; // Стили кнопки можно оставить так или тоже вынести в класс .is-loading

        // Имитируем задержку ответа сервера в 1.5 секунды
        setTimeout(() => {
            // Возвращаем кнопку в исходное рабочее состояние
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';

            // Выводим сообщение об успешной отправке формы
            successMessage.classList.remove('is-hidden'); // Показываем успех
            successMessage.style.animation = 'fadeIn 0.3s ease-in-out';

            // Полностью очищаем форму
            form.reset();

            // Скрываем сообщение об успехе автоматически через 5 секунд
            setTimeout(() => {
                successMessage.classList.add('is-hidden');
            }, 5000);

        }, 1500);
    });
});

