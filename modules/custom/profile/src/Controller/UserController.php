<?php
namespace Drupal\profile\Controller;

use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\profile\Model\UserModel; 
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Datetime\DateFormatterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UserController extends ControllerBase {
    protected $currentUser;
    protected $projectModel;
    protected $userModel;

    public function __construct($current_user, UserModel $userModel) {
        $this->currentUser = $current_user;
        $this->userModel = $userModel;
        
    }

    public static function create(ContainerInterface $container) {
        return new static(
            $container->get('current_user'), 
            $container->get('profile.profile_model')
        );
    }

    public function userInformation(){
        $uid = $this->currentUser->id();
        $user = User::load($uid);

        // Get the timezone
        $timezone = $user->getTimezone() ?? date_default_timezone_get();
        return [
            'username' => $user->getAccountName(),
            'email' => $user->getEmail(),
            'uid' => $uid,
            'timezone'=>$timezone,
        ];
    }
    public function saveUser(Request $request) {
        $data = json_decode($request->getContent(), TRUE);

        $username = $data['userName'];
        $password = $data['password'];
        $role = $data['role'];

        return new JsonResponse([
        'status' => 'success',
        'message' => 'User saved',
        'data' => $data,
        ]);
    }

}    