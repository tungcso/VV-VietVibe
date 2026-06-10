"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const mongoose = require('mongoose');
const path_1 = require("path");
const fs_1 = require("fs");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(env_1.MONGO_URI);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        exceptionFactory: (errors) => {
            const messages = errors
                .map((error) => {
                const constraints = Object.values(error.constraints || {});
                return constraints
                    .map((msg) => {
                    return msg
                        .replace(/must be longer than or equal to (\d+) characters/i, '最小$1文字以上である必要があります')
                        .replace(/must be an email/i, '有効なメールアドレスである必要があります')
                        .replace(/must be a string/i, '文字列である必要があります')
                        .replace(/should not be empty/i, '空にすることはできません');
                })
                    .join(', ');
            })
                .join('; ');
            return new common_1.BadRequestException(messages);
        },
    }));
    app.enableCors();
    app.use('/audios', (req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url);
        const filePath = (0, path_1.join)(process.cwd(), 'public', 'audios', decodedUrl);
        if (!(0, fs_1.existsSync)(filePath)) {
            const cleanedUrl = req.url.replace(/-\d+(?:-\d+)?(?=\.[^.]+$)/, '');
            const cleanedFilePath = (0, path_1.join)(process.cwd(), 'public', 'audios', decodeURIComponent(cleanedUrl));
            if ((0, fs_1.existsSync)(cleanedFilePath)) {
                console.log(`[Audio Fallback] File not found: ${decodedUrl}. Falling back to: ${decodeURIComponent(cleanedUrl)}`);
                req.url = cleanedUrl;
            }
        }
        next();
    });
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'public', 'audios'), {
        prefix: '/audios',
    });
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'public', 'avatars'), {
        prefix: '/avatars',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VietVibe API')
        .setDescription('Danh sách API cho VietVibe Project')
        .setVersion('1.0')
        .addTag('vietvibe')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token. Get from /auth/login or /auth/register',
    }, 'access_token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(env_1.PORT);
    console.log(`Application is running on: http://localhost:${env_1.PORT}`);
    console.log(`Swagger UI is available at: http://localhost:${env_1.PORT}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map