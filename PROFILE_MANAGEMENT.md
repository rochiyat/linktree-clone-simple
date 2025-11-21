# Profile Management Guide

Complete guide for managing your profile in the dashboard.

## Features

### 1. Profile Picture Management

#### Upload/Change Picture
1. Go to Dashboard
2. Click "Edit Profile" button
3. Enter your profile picture URL in the "Profile Picture URL" field
4. See live preview of your picture
5. Click "Save Changes"

**Supported Sources:**
- Direct image URLs (https://example.com/avatar.jpg)
- Imgur links
- GitHub avatars
- Gravatar
- Any publicly accessible image URL

**Tips:**
- Use square images for best results
- Recommended size: 400x400px or larger
- Supported formats: JPG, PNG, GIF, WebP

#### Remove Picture
1. Go to Dashboard
2. Click "Remove" button under your profile picture
3. Confirm removal
4. Default avatar will be shown (generated from your initials)

### 2. Profile Information

#### Edit Name
1. Click "Edit Profile"
2. Update your name in the "Name" field
3. Click "Save Changes"

**Note:** Your name is displayed on your public profile

#### Edit Bio
1. Click "Edit Profile"
2. Update your bio in the "Bio" field (supports multiple lines)
3. Click "Save Changes"

**Tips:**
- Keep it concise (2-3 sentences)
- Describe who you are and what you do
- Add emojis for personality ✨
- Maximum recommended length: 200 characters

#### Username
- Username is set during registration
- Cannot be changed (for URL stability)
- Displayed as @username in dashboard

## Profile Display

### Dashboard View
Your profile card shows:
- Profile picture (with remove option)
- Full name
- Username (@username)
- Email address
- Bio

### Public Profile View
Your public profile at `/{username}` shows:
- Profile picture
- Full name
- Bio (if set)
- Active links only
- Back to Home button

## Image Hosting Options

### Free Image Hosting Services

1. **Imgur** (Recommended)
   - Upload: https://imgur.com/upload
   - Free, no account required
   - Direct link format: `https://i.imgur.com/xxxxx.jpg`

2. **GitHub**
   - Use your GitHub avatar
   - Format: `https://github.com/username.png`
   - Example: `https://github.com/rochiyat.png`

3. **Gravatar**
   - Link to your email
   - Format: `https://gravatar.com/avatar/hash`
   - Get yours: https://gravatar.com

4. **Cloudinary**
   - Free tier available
   - CDN-backed
   - Image optimization

### Using Your Own Server
If you have your own website:
```
https://yourdomain.com/images/avatar.jpg
```

Make sure the image is publicly accessible!

## Best Practices

### Profile Picture
- ✅ Use a clear, professional photo
- ✅ Square aspect ratio (1:1)
- ✅ High resolution (400x400px+)
- ✅ Good lighting
- ❌ Avoid blurry images
- ❌ Avoid inappropriate content

### Name
- ✅ Use your real name or brand name
- ✅ Keep it professional
- ✅ Easy to read and remember
- ❌ Avoid special characters
- ❌ Don't use all caps

### Bio
- ✅ Be authentic and genuine
- ✅ Highlight your expertise
- ✅ Include a call-to-action
- ✅ Use emojis sparingly
- ❌ Don't write a novel
- ❌ Avoid jargon

## Examples

### Good Bio Examples

**Developer:**
```
Full Stack Developer | Building amazing web experiences with React & Node.js 🚀
```

**Designer:**
```
UI/UX Designer crafting beautiful digital products ✨ Available for freelance work
```

**Content Creator:**
```
Tech YouTuber sharing coding tutorials 📹 | 100K+ subscribers | Let's learn together!
```

**Business:**
```
Digital Marketing Agency | Helping brands grow online 📈 | Free consultation available
```

## Troubleshooting

### Profile Picture Not Showing

**Problem:** Image URL doesn't work

**Solutions:**
1. Check if URL is publicly accessible
2. Try opening URL in incognito/private browser
3. Ensure URL starts with `https://`
4. Check if image host allows hotlinking
5. Try a different image hosting service

**Problem:** Image shows broken icon

**Solutions:**
1. Verify image URL is correct
2. Check image file format (use JPG or PNG)
3. Ensure image is not deleted from host
4. Try re-uploading to a different host

### Changes Not Saving

**Problem:** Profile updates don't persist

**Solutions:**
1. Check internet connection
2. Ensure all required fields are filled
3. Try refreshing the page
4. Clear browser cache
5. Check browser console for errors

### Image Too Large/Small

**Problem:** Profile picture appears distorted

**Solutions:**
1. Use square images (1:1 aspect ratio)
2. Resize image before uploading
3. Use image editing tools:
   - Online: https://www.iloveimg.com/resize-image
   - Desktop: GIMP, Photoshop, Preview (Mac)

## Privacy & Security

### What's Public
- Profile picture
- Name
- Username
- Bio
- Active links

### What's Private
- Email address
- Password
- Inactive links
- Account settings

### Tips
- Don't include sensitive information in bio
- Use professional images only
- Be mindful of what you share
- Review your public profile regularly

## API Endpoints

For developers integrating with the API:

### Get Profile
```http
GET /api/profile
Authorization: Required
```

### Update Profile
```http
PATCH /api/profile
Authorization: Required
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Full Stack Developer",
  "image": "https://example.com/avatar.jpg"
}
```

### Remove Picture
```http
PATCH /api/profile
Authorization: Required
Content-Type: application/json

{
  "image": null
}
```

## Keyboard Shortcuts

In Edit Profile dialog:
- `Tab` - Navigate between fields
- `Enter` - Submit form (when in input field)
- `Esc` - Close dialog

## Mobile Experience

Profile management works seamlessly on mobile:
- Responsive design
- Touch-friendly buttons
- Easy image URL input
- Preview before saving

## Future Features

Coming soon:
- [ ] Direct image upload (no URL needed)
- [ ] Image cropping tool
- [ ] Multiple profile pictures
- [ ] Profile themes
- [ ] Custom fonts
- [ ] Profile analytics

## Support

Need help?
- Check [FAQ.md](FAQ.md)
- Open an issue on GitHub
- Contact support

---

**Last Updated**: November 21, 2024
