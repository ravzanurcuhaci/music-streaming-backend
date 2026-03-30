/**
 * Ortak validation yardımcı fonksiyonları
 * Tüm validation dosyaları bu helper'ları kullanır (DRY prensibi)
 */

// Değerin boş olup olmadığını kontrol eder (undefined, null, '')
function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

// Değerin pozitif bir sayı olup olmadığını kontrol eder
function isPositiveNumber(value) {
    return !isNaN(Number(value)) && Number(value) > 0;
}

// Basit email format kontrolü (@ ve . içermeli)
function isValidEmail(email) {
    // Regex açıklaması:
    // ^[^\s@]+  → başta boşluk ve @ olmayan en az 1 karakter
    // @         → @ işareti
    // [^\s@]+   → ortada boşluk ve @ olmayan en az 1 karakter
    // \.        → nokta işareti
    // [^\s@]+$  → sonda boşluk ve @ olmayan en az 1 karakter
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Standart validation hata response'u döner
function validationError(res, message) {
    return res.status(400).json({
        success: false,
        message,
    });
}

module.exports = {
    isEmpty,
    isPositiveNumber,
    isValidEmail,
    validationError,
};
