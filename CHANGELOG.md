## [2.0.4](https://github.com/xosnrdev/carai-api/compare/v2.0.3...v2.0.4) (2023-12-29)


### Bug Fixes

* entry-point.sh path configuration for the containers ([1b1dd2e](https://github.com/xosnrdev/carai-api/commit/1b1dd2e93c5dac25146068c40d494d1ddb542c90))



## [2.0.3](https://github.com/xosnrdev/carai-api/compare/v2.0.2...v2.0.3) (2023-12-29)


### Bug Fixes

* entry-point.sh path configuration for the containers ([fa14c50](https://github.com/xosnrdev/carai-api/commit/fa14c50fa2e288e078266fc2737068e4f585adca))



## [2.0.2](https://github.com/xosnrdev/carai-api/compare/v2.0.0...v2.0.2) (2023-12-29)


### Bug Fixes

* authorization to fetch the variables from s3 bucket ([dd6280e](https://github.com/xosnrdev/carai-api/commit/dd6280eeb274a9c65a9d78db0cc2ea4f4b51bc07))
* authorization to fetch the variables from s3 bucket ([1b5e73f](https://github.com/xosnrdev/carai-api/commit/1b5e73fac0f8609aebc2e304365a190adb75a47d))
* authorization to fetch the variables from s3 bucket ([cfdf9ac](https://github.com/xosnrdev/carai-api/commit/cfdf9acf21102d842b7824f5d2842d58b18ae4e5))
* **deployment:** ensure entry-point.sh script execution before Docker build ([e1b72d0](https://github.com/xosnrdev/carai-api/commit/e1b72d0034d2020b4a7dbe126b656c87b3d779c5))
* **s3bucket:** resolve issue with fetching env variables ([6485941](https://github.com/xosnrdev/carai-api/commit/64859414217a9162a36dfec10a0e18d37b6d396a))



# [2.0.0](https://github.com/xosnrdev/carai-api/compare/e9778ddbb280cf22a621acd14cdfdce1721a6d31...v2.0.0) (2023-12-29)


### Bug Fixes

* **ci/cd:** Ensure IMAGE_TAG is set for Docker Compose build ([9c4ed8a](https://github.com/xosnrdev/carai-api/commit/9c4ed8a2b595581ec9b7d864cf53c35a45dd5dfb))
* **ci/cd:** Ensure IMAGE_TAG is set for Docker Compose build ([840dc97](https://github.com/xosnrdev/carai-api/commit/840dc9740398b5edad674effa832239903df02dd))
* **docker-compose:** Correct environment variable interpolation for ECR image tagging ([a467fd3](https://github.com/xosnrdev/carai-api/commit/a467fd311937fd0385c32a3353e901f35a1f860a))
* **docker:** Correct entry-point script path and permissions ([3102534](https://github.com/xosnrdev/carai-api/commit/31025342290200cba00213b0730dc74f2212cc4a))
* migrate from ecs farget to ecs ec2 for docker socket support ([e9778dd](https://github.com/xosnrdev/carai-api/commit/e9778ddbb280cf22a621acd14cdfdce1721a6d31))


### Features

* **ci/cd:** Enhance error handling and add health checks in ECS deployment ([4959405](https://github.com/xosnrdev/carai-api/commit/4959405e74e4c1f285af61f53d504024814e9970))
* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([e18a4dc](https://github.com/xosnrdev/carai-api/commit/e18a4dc63c08123deaa6ad63a1221eb46cac3025))
* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([73d021d](https://github.com/xosnrdev/carai-api/commit/73d021d45300c222618cda668db12be75d8cd16a))
* **ci/cd:** Integrate OIDC with ECR login and Docker Compose for image pushing ([4aa0ffb](https://github.com/xosnrdev/carai-api/commit/4aa0ffb79c9a1dfd77590ca5fefcb8b29d335519))
* **docker:** Initialize Docker configuration for api service ([6af9bd4](https://github.com/xosnrdev/carai-api/commit/6af9bd4602a1aa11f9f090ac073976bc454ef191))
* **docker:** Initialize Docker configuration for api service ([5b5d4f4](https://github.com/xosnrdev/carai-api/commit/5b5d4f474f1e913e79c22c510432719d6bb9b0d5))
* Implement Docker context for ECS deployment in CI/CD ([daea82a](https://github.com/xosnrdev/carai-api/commit/daea82ae26d09944ff0b132349da776bb9138aa9))


### BREAKING CHANGES

* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.
* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.



