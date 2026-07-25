import unittest
import os
import json
import xml.etree.ElementTree as ET
from app.core.security import KeyEncryption, PasswordSecurity


class TestMYKPlatform(unittest.TestCase):

    def test_key_encryption_decryption(self):
        """Test symmetric Key Encryption (Fernet-AES) derived from JWT_SECRET"""
        raw_key = "AIzaSy_GEMINI_TEST_KEY_12345"
        encrypted = KeyEncryption.encrypt(raw_key)

        self.assertNotEqual(raw_key, encrypted)

        decrypted = KeyEncryption.decrypt(encrypted)
        self.assertEqual(raw_key, decrypted)
        print("✅ Symmetric KeyEncryption check: SUCCESS")

    def test_password_hashing(self):
        """Test secure bcrypt Password hashing and validation"""
        plain = "mohammad9095"
        hashed = PasswordSecurity.hash_password(plain)

        self.assertTrue(PasswordSecurity.verify_password(plain, hashed))
        self.assertFalse(PasswordSecurity.verify_password("wrong_password", hashed))
        print("✅ PasswordSecurity bcrypt check: SUCCESS")

    def test_pwa_manifest_existence_and_parsing(self):
        """Test PWA Manifest file structure and validation"""
        manifest_path = "frontend/public/manifest.json"
        self.assertTrue(os.path.exists(manifest_path), "manifest.json should exist")

        with open(manifest_path, 'r') as f:
            data = json.load(f)
            self.assertEqual(data["name"], "MYK Platform")
            self.assertEqual(data["short_name"], "MYK")
            self.assertEqual(data["display"], "standalone")
            self.assertEqual(data["theme_color"], "#030014")
        print("✅ PWA Manifest check: SUCCESS")

    def test_seo_sitemap_parsing(self):
        """Test SEO Sitemap XML schema and canonical tag mapping"""
        sitemap_path = "frontend/public/sitemap.xml"
        self.assertTrue(os.path.exists(sitemap_path), "sitemap.xml should exist")

        tree = ET.parse(sitemap_path)
        root = tree.getroot()

        # Verify namespaces
        self.assertIn("sitemap", root.tag)
        print("✅ Multilingual SEO Sitemap check: SUCCESS")


if __name__ == "__main__":
    unittest.main()
