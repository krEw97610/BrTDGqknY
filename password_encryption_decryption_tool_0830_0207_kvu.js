// 代码生成时间: 2025-08-30 02:07:41
// Import the CryptoJS library
const CryptoJS = require('crypto-js');

angular.module('passwordTool', [])
.controller('PasswordCtrl', ['$scope', function($scope) {
    // Initialize the password model
    $scope.password = '';
    $scope.encryptedPassword = '';
    $scope.decryptedPassword = '';
    $scope.error = '';

    // Function to encrypt the password
    $scope.encryptPassword = function() {
        try {
            // Use CryptoJS to encrypt the password
            $scope.encryptedPassword = CryptoJS.AES.encrypt(
                $scope.password,
                'secret key 123' // This should be a secure key
            ).toString();
            // Clear any previous errors
            $scope.error = '';
        } catch (error) {
            $scope.error = 'Encryption error: ' + error.message;
        }
    };

    // Function to decrypt the password
    $scope.decryptPassword = function() {
        try {
            // Use CryptoJS to decrypt the password
            const decryptedBytes = CryptoJS.AES.decrypt(
                $scope.encryptedPassword,
                'secret key 123' // This should be the same secure key used for encryption
            );
            // Convert the decrypted bytes to a string
            $scope.decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
            // Clear any previous errors
            $scope.error = '';
        } catch (error) {
            $scope.error = 'Decryption error: ' + error.message;
        }
    };

    // Function to toggle the password visibility
    $scope.togglePasswordVisibility = function() {
        $scope.passwordVisibility = !$scope.passwordVisibility;
    };
}]);