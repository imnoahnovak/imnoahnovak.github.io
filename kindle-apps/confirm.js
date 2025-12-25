(function () {
    if (window.showConfirmDialog) return;

    const styleId = 'kindle-confirm-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
        .confirm-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }

        .confirm-dialog {
            background: var(--surface-color, var(--background-color, #ffffff));
            color: var(--text-color, #000000);
            border: 2px solid var(--border-color, #000000);
            width: min(420px, calc(100% - 40px));
            padding: 20px;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
        }

        .confirm-message {
            font-size: 16px;
            margin-bottom: 18px;
            line-height: 1.4;
        }

        .confirm-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .confirm-btn {
            padding: 10px 18px;
            font-size: 14px;
            font-weight: bold;
            border: 2px solid var(--border-color, #000000);
            background: var(--background-color, #ffffff);
            color: var(--text-color, #000000);
            cursor: pointer;
        }

        .confirm-btn:hover,
        .confirm-btn:focus {
            background: var(--text-color, #000000);
            color: var(--background-color, #ffffff);
        }

        .confirm-btn.danger {
            background: var(--text-color, #000000);
            color: var(--background-color, #ffffff);
        }

        .confirm-btn.danger:hover,
        .confirm-btn.danger:focus {
            filter: brightness(1.05);
        }
        `;
        document.head.appendChild(style);
    }

    window.showConfirmDialog = function ({
        message = 'Are you sure?',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        destructive = false
    } = {}) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'confirm-overlay';
            overlay.innerHTML = `
                <div class="confirm-dialog" role="dialog" aria-modal="true" aria-live="assertive">
                    <div class="confirm-message">${message}</div>
                    <div class="confirm-actions">
                        <button class="confirm-btn" data-action="cancel">${cancelText}</button>
                        <button class="confirm-btn ${destructive ? 'danger' : ''}" data-action="confirm">${confirmText}</button>
                    </div>
                </div>
            `;

            const dialog = overlay.querySelector('.confirm-dialog');
            const cancelBtn = overlay.querySelector('[data-action="cancel"]');
            const confirmBtn = overlay.querySelector('[data-action="confirm"]');

            const cleanup = (result) => {
                overlay.remove();
                document.removeEventListener('keydown', onKeyDown);
                resolve(result);
            };

            const onKeyDown = (event) => {
                if (event.key === 'Escape') {
                    cleanup(false);
                }
                if (event.key === 'Enter') {
                    cleanup(true);
                }
            };

            overlay.addEventListener('click', (event) => {
                if (event.target === overlay) {
                    cleanup(false);
                }
            });

            cancelBtn.addEventListener('click', () => cleanup(false));
            confirmBtn.addEventListener('click', () => cleanup(true));
            document.addEventListener('keydown', onKeyDown);

            document.body.appendChild(overlay);
            (confirmBtn || dialog).focus();
        });
    };
})();
